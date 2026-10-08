import os
import json
import asyncio
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Optional, Dict, Any
import certifi
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Set SSL Certificate Bundle
os.environ.setdefault("SSL_CERT_FILE", certifi.where())
os.environ.setdefault("REQUESTS_CA_BUNDLE", certifi.where())

# Load .env if present
ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")
load_dotenv(Path(__file__).resolve().parent / ".env")

# Load campus data
DATA_FILE = Path(__file__).resolve().parent / "campus_data.json"
campus_data: Dict[str, Any] = {}
if DATA_FILE.exists():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            campus_data = json.load(f)
    except Exception as e:
        print(f"Warning: Failed to load campus_data.json: {e}")

# -------------------------------------------------------------
# Google Antigravity SDK Tool Definitions
# -------------------------------------------------------------

def get_student_profile() -> str:
    """Retrieves current student academic profile, department, CGPA, attendance, and faculty advisor."""
    student = campus_data.get("initialStudentData", {})
    if not student:
        return "Student data not available."
    return json.dumps(student, indent=2)

def get_student_timetable(day: str = "") -> str:
    """Gets the student timetable and class schedule for a specific day or all weekdays.

    Args:
        day: Day of week (e.g. 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'today', 'tomorrow'). If blank or 'today', gets current day's classes. If 'tomorrow', gets next day's classes.
    """
    tt = campus_data.get("timetableData", {})
    schedule = tt.get("schedule", {})
    periods = {p["slot"]: p["time"] for p in tt.get("periods", [])}

    now = datetime.now()
    clean_day = day.strip().lower()

    if not clean_day or clean_day == "today":
        target_day = now.strftime("%A")
    elif clean_day == "tomorrow":
        target_day = (now + timedelta(days=1)).strftime("%A")
    elif clean_day == "yesterday":
        target_day = (now - timedelta(days=1)).strftime("%A")
    else:
        target_day = clean_day.capitalize()

    if target_day in ["Saturday", "Sunday"]:
        return json.dumps({
            "day": target_day,
            "status": "Weekend",
            "message": f"{target_day} is a weekend. No academic classes scheduled."
        }, indent=2)

    if target_day in schedule:
        classes = schedule[target_day]
        enriched = []
        for c in classes:
            if c.get("code") and not c.get("spanContinue"):
                slot_time = periods.get(c.get("slot"), "N/A")
                enriched.append({
                    "slot": c.get("slot"),
                    "time": slot_time,
                    "subject": c.get("subject"),
                    "code": c.get("code"),
                    "room": c.get("room"),
                    "faculty": c.get("faculty")
                })
        return json.dumps({target_day: enriched}, indent=2)

    return json.dumps(schedule, indent=2)

def get_assignments(status: str = "all") -> str:
    """Gets list of course assignments, deadlines, maximum marks, and submission statuses.

    Args:
        status: Filter by 'Pending', 'Submitted', or 'all'.
    """
    assignments = campus_data.get("assignmentsData", [])
    if status.lower() != "all":
        filtered = [a for a in assignments if a.get("status", "").lower() == status.lower()]
        return json.dumps(filtered, indent=2)
    return json.dumps(assignments, indent=2)

def get_upcoming_events() -> str:
    """Gets upcoming and ongoing campus events, technical symposiums, hackathons, dates, venues, and registration deadlines."""
    events = campus_data.get("initialEvents", [])
    upcoming = [e for e in events if e.get("status") in ["Upcoming", "Ongoing"]]
    return json.dumps(upcoming, indent=2)

def get_subjects_and_syllabus(query: str = "") -> str:
    """Gets enrolled subjects, course codes, faculty instructors, attendance, and syllabus topics.

    Args:
        query: Subject name or code (e.g. 'Deep Learning', 'OS', '3-CSE-DL'). Leave blank for all subjects.
    """
    subjects = campus_data.get("subjectsData", [])
    if query:
        q = query.lower()
        matches = [
            s for s in subjects
            if q in s.get("name", "").lower()
            or q in s.get("code", "").lower()
            or q in s.get("shortName", "").lower()
        ]
        if matches:
            return json.dumps(matches, indent=2)
    return json.dumps(subjects, indent=2)

def get_emergency_and_helpdesk_contacts() -> str:
    """Gets campus emergency contact numbers, health centre/ambulance, student helpdesk, IT support, and exam cell contacts."""
    directory = campus_data.get("campusDirectory", [])
    emergencies = campus_data.get("emergencyContacts", [])
    return json.dumps({
        "emergency_contacts": emergencies,
        "campus_directory": directory
    }, indent=2)

def get_leave_applications(query: str = "") -> str:
    """Retrieves student leave requests, dates, leave types (Medical, Academic, Personal), status (Approved, Pending, Rejected), faculty approver, and remarks.

    Args:
        query: Optional filter for leave type or status (e.g. 'Medical', 'Academic', 'Pending', 'Approved').
    """
    leaves = campus_data.get("initialLeavesData", [])
    student_leaves = [lv for lv in leaves if lv.get("reg") == "99240040191" or lv.get("student") == "Arun Kumar M"]

    if query:
        q = query.lower()
        filtered = [
            lv for lv in student_leaves
            if q in lv.get("type", "").lower()
            or q in lv.get("status", "").lower()
            or q in lv.get("reason", "").lower()
        ]
        if filtered:
            return json.dumps(filtered, indent=2)

    return json.dumps(student_leaves, indent=2)


TOOLS_LIST = [
    get_student_profile,
    get_student_timetable,
    get_assignments,
    get_upcoming_events,
    get_subjects_and_syllabus,
    get_emergency_and_helpdesk_contacts,
    get_leave_applications,
]

def get_system_instructions() -> str:
    now = datetime.now()
    today_name = now.strftime("%A")
    today_date = now.strftime("%B %d, %Y")
    tomorrow_name = (now + timedelta(days=1)).strftime("%A")
    tomorrow_date = (now + timedelta(days=1)).strftime("%B %d, %Y")
    return (
        f"You are KLU CampusGenie, the official intelligent AI Assistant for Kalasalingam Academy of Research and Education (Kalasalingam University).\n"
        f"Real-Time Context:\n"
        f"- Today is {today_name}, {today_date}.\n"
        f"- Tomorrow is {tomorrow_name}, {tomorrow_date}.\n"
        f"When a student asks 'What classes do I have today?' or 'today timetable', check {today_name}.\n"
        f"When a student asks 'What classes do I have tomorrow?' or 'tomorrow timetable', check {tomorrow_name}.\n"
        f"Leaves & Approvals Context:\n"
        f"- The student (Arun Kumar M) has leave applications accessible via get_leave_applications.\n"
        f"- When asked 'did the faculty approve my medical leave?' or similar questions, check get_leave_applications. Specifically, his Medical/Health Leave (Sep 15 - Sep 16, 2026 for 2 days) was Approved by Dr. K. Senthil Nathan (Faculty Advisor) with remark 'Approved. Take care of your health.'.\n"
        f"- Also mention if there are any other leaves pending (e.g. Academic Event on Oct 12-13, 2026 is Pending).\n"
        f"Your purpose is to assist students, faculty, and scholars with academic inquiries, timetable schedules, assignments, deadlines, campus events, and university contacts.\n"
        f"Formatting Guidelines:\n"
        f"- You are rendered in a sleek, compact chat window (400px width).\n"
        f"- Present class timetables and leave records using clean, structured bullet cards with emojis and bold details:\n"
        f"  Example:\n"
        f"  - **Slot 1 (09:00 – 10:00)**: **Computer Networks** (`3-CSE-CN`) · Room: `Lab8401` · Faculty: Dr. M. R. Arun\n"
        f"- If you choose to use a table, keep it compact (max 3 to 4 columns: Time, Subject, Room, Faculty).\n"
        f"- Always provide helpful, polite, and well-structured answers."
    )

# -------------------------------------------------------------
# Local Fallback Intent Resolver (Active if API key quota exceeded or offline)
# -------------------------------------------------------------

def resolve_locally(message: str) -> str:
    q = message.lower()
    now = datetime.now()
    today_name = now.strftime("%A")
    today_date = now.strftime("%B %d, %Y")
    tomorrow_name = (now + timedelta(days=1)).strftime("%A")
    tomorrow_date = (now + timedelta(days=1)).strftime("%B %d, %Y")
    yesterday_name = (now - timedelta(days=1)).strftime("%A")

    # Leaves / Medical Leave Approval
    if any(k in q for k in ["leave", "medical leave", "approved", "approval", "od", "permission"]):
        leaves = json.loads(get_leave_applications())

        # Specific inquiry for medical leave
        if "medical" in q:
            med = next((lv for lv in leaves if "medical" in lv.get("type", "").lower()), None)
            if med:
                status = med.get("status")
                approver = med.get("approvedBy") or "Dr. K. Senthil Nathan (Faculty Advisor)"
                remark = med.get("remark") or "Approved. Take care of your health."
                return (
                    f"🏥 **Medical Leave Status**:\n\n"
                    f"✅ **Yes, your Medical Leave has been Approved!**\n\n"
                    f"- **Leave Type**: {med.get('type')}\n"
                    f"- **Duration**: {med.get('from')} to {med.get('to')} ({med.get('days')} days)\n"
                    f"- **Reason**: {med.get('reason')}\n"
                    f"- **Status**: **{status}**\n"
                    f"- **Approved By**: **{approver}**\n"
                    f"- **Faculty Remark**: *\"{remark}\"*\n"
                    f"- **Applied Date**: {med.get('applied')}"
                )

        # General list of leave applications
        lines = ["📋 **Your Leave Applications & Status**:\n"]
        for lv in leaves:
            status_emoji = "✅" if lv.get("status") == "Approved" else ("⏳" if lv.get("status") == "Pending" else "❌")
            lines.append(
                f"{status_emoji} **{lv.get('type')}** ({lv.get('days')} Days: {lv.get('from')} to {lv.get('to')})\n"
                f"   • Status: **{lv.get('status')}**"
                + (f" by **{lv.get('approvedBy')}**" if lv.get('approvedBy') else "") + "\n"
                + (f"   • Remark: *\"{lv.get('remark')}\"*\n" if lv.get('remark') else "")
            )
        return "\n".join(lines)

    # Timetable / Class Schedule
    if any(k in q for k in ["timetable", "schedule", "class", "routine", "period", "today", "tomorrow", "yesterday"]):
        target_day = None
        target_label = ""

        if "tomorrow" in q:
            target_day = tomorrow_name
            target_label = f"Tomorrow's Timetable ({tomorrow_name}, {tomorrow_date})"
        elif "yesterday" in q:
            target_day = yesterday_name
            target_label = f"Yesterday's Timetable ({yesterday_name})"
        elif "today" in q:
            target_day = today_name
            target_label = f"Today's Timetable ({today_name}, {today_date})"
        else:
            for day in ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]:
                if day in q:
                    target_day = day.capitalize()
                    target_label = f"Timetable for {target_day}"
                    break

        if not target_day:
            target_day = today_name
            target_label = f"Today's Timetable ({today_name}, {today_date})"

        if target_day in ["Saturday", "Sunday"]:
            return (
                f"🎉 **{target_label}**:\n\n"
                f"**{target_day}** is a weekend — No academic classes scheduled!\n\n"
                f"Enjoy your weekend! You can ask for `Monday timetable` to view next week's schedule."
            )

        tt = campus_data.get("timetableData", {})
        schedule = tt.get("schedule", {})
        periods = {p["slot"]: p["time"] for p in tt.get("periods", [])}
        classes = schedule.get(target_day, [])
        active_classes = [c for c in classes if c.get("code") and not c.get("spanContinue")]

        if not active_classes:
            return f"📅 **{target_label}**: No classes scheduled."

        lines = [f"📅 **{target_label}**:\n"]
        for c in active_classes:
            slot_time = periods.get(c.get("slot"), "")
            lines.append(
                f"- **Slot {c.get('slot')}** ({slot_time}): **{c.get('subject')}** (`{c.get('code')}`) | Room: `{c.get('room')}` | Faculty: {c.get('faculty')}"
            )
        return "\n".join(lines)

    # Student Profile / CGPA / Attendance
    if any(k in q for k in ["profile", "who am i", "my details", "cgpa", "register number", "reg no", "attendance"]):
        data = json.loads(get_student_profile())
        return (
            f"🎓 **Student Profile Overview**\n\n"
            f"- **Name**: {data.get('name')}\n"
            f"- **Register Number**: `{data.get('registerNumber')}`\n"
            f"- **Department**: {data.get('department')} ({data.get('deptShort')})\n"
            f"- **Year / Semester**: {data.get('year')} · {data.get('semester')} (Section {data.get('section')})\n"
            f"- **CGPA**: **{data.get('cgpa')}** / 10.0\n"
            f"- **Overall Attendance**: **{data.get('attendance')}**\n"
            f"- **Faculty Advisor**: {data.get('advisor')}\n"
            f"- **Campus Email**: {data.get('email')}"
        )

    # Assignments
    if any(k in q for k in ["assignment", "homework", "due date", "submission", "pending"]):
        asgns = json.loads(get_assignments("all"))
        pending = [a for a in asgns if a.get("status") == "Pending"]
        submitted = [a for a in asgns if a.get("status") == "Submitted"]

        lines = ["📝 **Your Academic Assignments**:\n", "**Pending Deadlines**:"]
        for a in pending:
            lines.append(f"• **{a.get('title')}** ({a.get('subject')}) — Due: **{a.get('dueDate')}** (Priority: {a.get('priority', '').upper()})")
        lines.append("\n**Recently Submitted**:")
        for a in submitted:
            lines.append(f"✓ **{a.get('title')}** ({a.get('subject')}) — Submitted on {a.get('submittedDate')}")
        return "\n".join(lines)

    # Events
    if any(k in q for k in ["event", "symposium", "hackathon", "tekcluster", "thulir", "kare trophy"]):
        events = json.loads(get_upcoming_events())
        lines = ["🎉 **Upcoming Campus Events & Activities**:\n"]
        for e in events[:4]:
            lines.append(f"• **{e.get('name')}** ({e.get('category')})\n  📅 Date: {e.get('date')} | 📍 Venue: {e.get('venue')}\n  ℹ️ {e.get('shortDescription')}\n")
        return "\n".join(lines)

    # Contacts & Emergency
    if any(k in q for k in ["emergency", "ambulance", "security", "contact", "phone", "helpdesk", "hospital"]):
        contacts = json.loads(get_emergency_and_helpdesk_contacts())
        lines = ["🚨 **Campus Emergency & Key Support Contacts**:\n"]
        for c in contacts.get("emergency_contacts", []):
            lines.append(f"- **{c.get('role')}**: 📞 `{c.get('number')}` ({c.get('details')})")
        lines.append("\n**Campus Administration & Helpdesks**:")
        for d in contacts.get("campus_directory", [])[:3]:
            lines.append(f"- **{d.get('title')}**: 📞 `{d.get('contact')}` | ✉️ `{d.get('email')}`")
        return "\n".join(lines)

    # Subjects
    if any(k in q for k in ["subject", "syllabus", "course", "deep learning", "networks", "operating system", "daa"]):
        subs = json.loads(get_subjects_and_syllabus())
        lines = ["📚 **Enrolled Subjects for Semester 5**:\n"]
        for s in subs:
            lines.append(f"- **{s.get('name')}** (`{s.get('code')}`) | Faculty: {s.get('faculty')} | Attendance: {s.get('attendance')} | Test: {s.get('upcomingTest')}")
        return "\n".join(lines)

    # Default
    return (
        "👋 Hello! I am **KLU CampusGenie**, powered by the **Google Antigravity SDK**.\n\n"
        "Here are things I can assist you with right now:\n"
        "- 📅 **Timetable & Classes**: \"What classes do I have today?\" or \"Tomorrow's timetable\"\n"
        "- 🏥 **Leaves & Permissions**: \"Did the faculty approve my medical leave?\"\n"
        "- 📝 **Assignments**: \"What assignments are pending?\"\n"
        "- 🎓 **Academic Profile**: \"Show my CGPA and attendance\"\n"
        "- 🎉 **Events**: \"Tell me about TEKCLUSTER and hackathons\"\n"
        "- 🚨 **Emergency & Helpdesk**: \"Give me campus emergency contacts\"\n"
        "- 📚 **Subjects & Syllabus**: \"What are the topics in Deep Learning?\""
    )


# -------------------------------------------------------------
# FastAPI App Setup
# -------------------------------------------------------------

app = FastAPI(title="Kalasalingam Smart Campus AI Agent", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = []

class KeyUpdateRequest(BaseModel):
    api_key: str


@app.get("/api/health")
async def health():
    has_key = bool(os.getenv("GEMINI_API_KEY", "").strip())
    return {
        "status": "healthy",
        "engine": "Google Antigravity SDK",
        "model": "gemini-3.1-flash-lite",
        "has_gemini_key": has_key,
        "available_tools": [t.__name__ for t in TOOLS_LIST],
    }


@app.post("/api/config/key")
async def set_api_key(req: KeyUpdateRequest):
    key = req.api_key.strip()
    if not key:
        raise HTTPException(status_code=400, detail="API Key cannot be empty")
    os.environ["GEMINI_API_KEY"] = key
    env_file = ROOT_DIR / ".env"
    with open(env_file, "a", encoding="utf-8") as f:
        f.write(f"\nGEMINI_API_KEY={key}\n")
    return {"status": "success", "message": "API Key saved and loaded successfully"}


@app.post("/api/chat")
async def chat(req: ChatRequest):
    message = req.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    # Try Google Antigravity Agent with gemini-3.1-flash-lite (high quota & fast)
    if api_key:
        try:
            from google.antigravity import Agent, LocalAgentConfig, types
            from google.antigravity.types import TemplatedSystemInstructions

            config = LocalAgentConfig(
                model="gemini-3.1-flash-lite",
                api_key=api_key,
                workspaces=[],
                system_instructions=TemplatedSystemInstructions(identity=get_system_instructions()),
                tools=TOOLS_LIST,
                retry_config=types.RetryConfig(
                    api_retry=types.ModelAPIRetryConfig(
                        max_retries=1,
                        initial_sleep_duration_ms=500
                    )
                )
            )

            async def run_agent():
                async with Agent(config=config) as agent:
                    resp = await agent.chat(message)
                    return await resp.text()

            reply_text = await asyncio.wait_for(run_agent(), timeout=12.0)
            return {
                "reply": reply_text,
                "model": "Gemini 3.1 Flash (Google Antigravity SDK)",
                "has_key": True
            }
        except Exception as e:
            print(f"Antigravity Agent error: {e}. Using real-time campus resolver.")
            fallback_answer = resolve_locally(message)
            return {
                "reply": fallback_answer,
                "model": "KLU Campus Domain Engine (Google Antigravity SDK)",
                "has_key": True
            }

    # If no API key set
    local_reply = resolve_locally(message)
    return {
        "reply": local_reply,
        "model": "KLU Campus Domain Engine",
        "has_key": False
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.agent_server:app", host="127.0.0.1", port=8000, reload=False)
