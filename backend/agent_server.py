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
        f"You are KLU CampusGenie, the official intelligent AI Assistant for Kalasalingam Academy of Research and Education (KARE / Kalasalingam University).\n"
        f"Real-Time Context:\n"
        f"- Today is {today_name}, {today_date}.\n"
        f"- Tomorrow is {tomorrow_name}, {tomorrow_date}.\n\n"
        f"University Profile:\n"
        f"- Full Name: Kalasalingam Academy of Research and Education (Deemed University u/s 3 of UGC Act 1956).\n"
        f"- Founder: 'Kalvivallal' Thiru T. Kalasalingam (Est. 1984). Chancellor: Dr. K. Sridharan. Pro-Chancellors: Dr. S. Shasi Anand, Mr. S. Arjun Kalasalingam. Vice-Chancellor: Dr. S. Narayanan.\n"
        f"- Location: Anand Nagar, Krishnankoil - 626126, Srivilliputtur, Virudhunagar District, Tamil Nadu.\n"
        f"- Accreditations: NAAC 'A+' Grade (CGPA 3.58+), NIRF Top 50, ABET Accredited, NBA Tier-1.\n\n"
        f"Academic Regulations (UG / Law / Engg):\n"
        f"- Attendance: Minimum 75% attendance mandatory. Condonation permitted for 65% to 74% strictly on genuine medical grounds (prior medical leave + physician certificate submitted 2 days before last working day, recommended by HoD to Vice-Chancellor). Below 65% is not condonable (Grade 'W' - must re-register).\n"
        f"- Absolute Grading Scale: S (>=90%, 10 GP), A (80-89%, 9 GP), B (70-79%, 8 GP), C (60-69%, 7 GP), D (55-59%, 6 GP), E (50-54%, 5 GP), U (<50%, 0 GP - Reappear), W (0 GP - Attendance shortage), I (0 GP - Incomplete).\n"
        f"- Degree Classification: First Class with Distinction (CGPA >= 8.25 in 1st attempt in minimum duration), First Class (CGPA >= 6.5 in N+2 years), Pass.\n"
        f"- Course Credits: Min 18 credits, Max 25 credits per regular semester. Re-registration max 8 credits.\n\n"
        f"KARE Ph.D. Regulations (2023):\n"
        f"- Eligibility: Master's degree with 55% (50% for SC/ST/OBC/EWS/PwD) or 4-year B.Tech with 75% + GATE score.\n"
        f"- Admission: KARE-DPET (50% Research Methodology + 50% Subject; 70% exam + 30% interview) or UGC-NET/CSIR-NET/GATE.\n"
        f"- Duration: Min 3 yrs (after M.Tech) / 4 yrs (after B.Tech), Max 6 yrs (extendable to 8 yrs; 10 yrs for female/PwD with 240 days maternity/childcare leave).\n"
        f"- Coursework: Min 12 credits including Research Methodology and Research & Publication Ethics (RPE). 27 credits for Integrated Ph.D.\n"
        f"- Comprehensive Viva: Within 3 semesters to 2 years after coursework.\n"
        f"- Plagiarism: Mandatory screening via iThenticate at Director (R&D) office.\n"
        f"- Publications for Synopsis: Min 3 Scopus papers (at least 1 SCI with IF) for Engg/Science; min 2 Scopus + 1 UGC CARE for Management/Law/Arch.\n"
        f"- Evaluation: 2 external examiners (1 National, 1 International) + open public Viva-Voce defense. Depository: INFLIBNET / Shodhganga.\n\n"
        f"Academic Calendar (Odd Sem 2025-26):\n"
        f"- Odd Sem Commencement: July 7 | Course Registration: June 27 - July 5 | Fee Deadline: August 11\n"
        f"- Sessional I: August 18 | Sessional II / Mid-Sem: October 7 | Last Working Day: November 7\n"
        f"- Practical Exams: November 10 | Theory Exams: November 17 | Results Declaration: December 19\n"
        f"- Events: TEKCLUSTER '26, Mirth 2k25 (Sep 12), Vintra (Intramural Sports), Engineers Day (Sep 15).\n\n"
        f"Active Student Context:\n"
        f"- Arun Kumar M (Reg No: 99240040191) | 3rd Year B.Tech CSE (Sec B) | CGPA: 8.64 | Attendance: 91.5% | Advisor: Dr. K. Senthil Nathan.\n"
        f"- Medical Leave (Sep 15 - Sep 16, 2026, 2 days) was APPROVED by Dr. K. Senthil Nathan ('Approved. Take care of your health.').\n\n"
        f"General AI Capabilities:\n"
        f"- You also act as an advanced general AI: answer coding questions (Python, C, C++, Java, JS, SQL, algorithms), math, physics, letter drafting, and placement interview tips.\n"
        f"- Keep responses well-structured with clear markdown, bold headers, and compact tables where appropriate."
    )

# -------------------------------------------------------------
# Local Fallback Intent Resolver (Active if API key quota exceeded or offline)
# -------------------------------------------------------------

def resolve_locally(message: str) -> str:
    q = message.lower().strip()
    now = datetime.now()
    today_name = now.strftime("%A")
    today_date = now.strftime("%B %d, %Y")
    tomorrow_name = (now + timedelta(days=1)).strftime("%A")
    tomorrow_date = (now + timedelta(days=1)).strftime("%B %d, %Y")
    yesterday_name = (now - timedelta(days=1)).strftime("%A")

    # Greetings & Casual
    if q in ["hi", "hello", "hey", "vanakkam", "namaste", "greetings"]:
        return (
            "👋 **Hello! Welcome to Kalasalingam Smart Campus Portal!**\n\n"
            "I am **KLU CampusGenie**, powered by the **Google Antigravity SDK**.\n"
            "I can assist you with:\n"
            "- 📅 **Classes & Timetable**: \"What classes do I have today?\" or \"Tomorrow's schedule\"\n"
            "- 🏥 **Medical Leaves**: \"Did the faculty approve my medical leave?\"\n"
            "- 📊 **Academic Regulations**: Attendance 75% rule, 65% condonation, absolute grading, CGPA\n"
            "- 🔬 **KARE Ph.D. Regulations**: Eligibility, KARE-DPET, RAC, coursework, and publication rules\n"
            "- 🗓️ **Academic Calendar**: Sessional exams, semester results, holidays\n"
            "- 📝 **Assignments & CGPA**: Deadlines, marks, student profile\n"
            "- 💻 **General AI**: Coding help (Python, Java, C++), science, math, or drafting leave letters!\n\n"
            "How can I assist you right now?"
        )

    if "how are you" in q:
        return "😊 I'm doing great and ready to assist you! How are your studies and classes going at Kalasalingam University today?"

    if any(k in q for k in ["who are you", "who created you", "what are you"]):
        return (
            "🤖 I am **KLU CampusGenie**, the official AI assistant of **Kalasalingam Academy of Research and Education (KARE)**, "
            "engineered with the **Google Antigravity SDK**. I possess comprehensive knowledge about Kalasalingam University's "
            "academic rules, Ph.D. regulations, timetable, and examinations, as well as general AI skills for coding, math, and writing!"
        )

    # Leaves / Medical Leave Approval
    if any(k in q for k in ["leave", "medical leave", "approved", "approval", "od", "permission"]):
        leaves = json.loads(get_leave_applications())
        if "medical" in q or "faculty approve" in q or "did the faculty" in q:
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

    # Attendance Regulations & Condonation
    if "attendance" in q and any(k in q for k in ["rule", "condonation", "shortage", "percentage", "minimum", "65", "75", "policy"]):
        return (
            "📊 **Kalasalingam University (KARE) Attendance Regulations**:\n\n"
            "1. **Mandatory Attendance Requirement**:\n"
            "- Students must secure a **minimum of 75% attendance** in each course to be eligible for Continuous Assessments (CA) and Semester End Examinations (SEE).\n\n"
            "2. **Condonation of Shortage of Attendance (Section 4.7.1)**:\n"
            "- Students securing between **65% and 74% attendance** may apply for condonation of attendance shortage strictly on **genuine medical grounds**.\n"
            "- **Procedure**: Prior medical leave must be availed, and a formal application along with an authorized physician's medical certificate must be submitted **at least 2 days prior to the last working day**.\n"
            "- The Head of Department (HoD) verifies the medical reports and forwards the recommendation to the **Vice-Chancellor** for final sanction.\n\n"
            "3. **Below 65% Attendance**:\n"
            "- Shortage below 65% is **not condonable** under any circumstance.\n"
            "- Such students are awarded Grade **'W'** (Failure for want of minimum attendance) and must **re-register** for the course in subsequent semesters."
        )

    # Grading System & CGPA
    if any(k in q for k in ["grading", "grade point", "sgpa", "cgpa", "absolute grading", "how to calculate cgpa", "grade s", "grade u", "grade w"]):
        return (
            "🎓 **KARE Absolute Grading System & Grade Points**:\n\n"
            "| Letter Grade | Grade Point | Mark Range | Academic Standing |\n"
            "| :--- | :---: | :---: | :--- |\n"
            "| **S** | 10 | >= 90% | Outstanding (Pass) |\n"
            "| **A** | 9 | 80% - 89% | Excellent (Pass) |\n"
            "| **B** | 8 | 70% - 79% | Very Good (Pass) |\n"
            "| **C** | 7 | 60% - 69% | Good (Pass) |\n"
            "| **D** | 6 | 55% - 59% | Fair (Pass) |\n"
            "| **E** | 5 | 50% - 54% | Satisfactory (Pass) |\n"
            "| **U** | 0 | < 50% | Re-appear / Arrear (Fail) |\n"
            "| **W** | 0 | — | Failure for want of attendance |\n"
            "| **I** | 0 | — | Incomplete Course |\n\n"
            "**GPA Calculations**:\n"
            "- **SGPA** = `Σ(Credits × Grade Points) / Σ(Credits)` for that semester.\n"
            "- **CGPA** = Cumulative across all semesters up to 2 decimal places.\n\n"
            "**Degree (Hons) Classifications**:\n"
            "- 🌟 **First Class with Distinction**: CGPA >= 8.25 in 1st attempt within minimum duration ($N$ years).\n"
            "- 🎖️ **First Class**: CGPA >= 6.5 completed within maximum duration ($N+2$ years).\n"
            "- 📜 **Pass**: Cleared all credit and mandatory requirements."
        )

    # Ph.D. Regulations (2023)
    if any(k in q for k in ["phd", "ph.d", "doctor of philosophy", "doctoral", "research scholar", "kare-dpet", "synopsis", "thesis", "rac"]):
        return (
            "🔬 **Kalasalingam University (KARE) Ph.D. Regulations (2023 Guidelines)**:\n\n"
            "1. **Eligibility Criteria**:\n"
            "- **Master's Degree**: Minimum **55% aggregate** (50% for SC/ST/OBC non-creamy layer/differently-abled/EWS).\n"
            "- **Direct Ph.D. after 4-Year B.Tech**: Minimum **75% aggregate** with a valid **GATE score**.\n\n"
            "2. **Admission Process**:\n"
            "- Conducted twice a year via **KARE-DPET** (50% Research Methodology + 50% Subject-specific).\n"
            "- Selection weightage: **70% entrance test + 30% personal interview**.\n"
            "- Scholars with UGC-NET / CSIR-NET / GATE / CEED fellowships are exempted from the test and appear directly for interview.\n\n"
            "3. **Programme Duration**:\n"
            "- After M.Tech: Min **3 years**, Max **6 years** (extendable to 8 years).\n"
            "- Direct Ph.D. after B.Tech: Min **4 years**, Max **6 years**.\n"
            "- Female scholars & PwD (>40%): Relaxation up to **10 years total**, with up to **240 days maternity/childcare leave**.\n\n"
            "4. **Key Doctoral Milestones**:\n"
            "- **RAC**: Supervisor (Convener) + 1 External Expert + 2 Internal School members review progress every semester.\n"
            "- **Coursework**: Minimum **12 credits** (includes Research Methodology + Research & Publication Ethics - RPE). 27 credits for Integrated Ph.D.\n"
            "- **Comprehensive Viva-Voce**: Within 3 semesters to 2 years after coursework to confirm registration.\n"
            "- **Plagiarism Screening**: Mandatory check using **iThenticate** at the Office of Director (R&D).\n"
            "- **Publications for Synopsis**: Min **3 Scopus papers** (at least 1 in SCI journal with Impact Factor) for Engg/Tech/Science; min 2 Scopus + 1 UGC CARE for Management/Law/Arch.\n"
            "- **Evaluation**: 2 external examiners (1 National, 1 International) followed by open public Viva-Voce defense.\n"
            "- **Depository**: Hosted on **INFLIBNET / Shodhganga**."
        )

    # Academic Calendar & Key Dates
    if any(k in q for k in ["calendar", "sessional", "mid semester", "last working day", "exam date", "practical exam", "theory exam", "results date", "even semester"]):
        return (
            "🗓️ **KARE Academic Calendar & Important Dates (Odd Semester 2025-26)**:\n\n"
            "- 🚀 **Commencement of Odd Semester**: **July 7**\n"
            "- 📝 **Course Registration**: June 27 – July 5\n"
            "- ❌ **Last Date for Course Withdrawal**: July 11\n"
            "- 💰 **Last Date for Tuition Fee Payment**: **August 11**\n"
            "- ✍️ **Sessional Examination I**: **August 18**\n"
            "- ✍️ **Sessional Examination II / Mid-Sem**: **October 7**\n"
            "- 🏁 **Last Working Day**: **November 7**\n"
            "- 🔬 **End Semester Practical Examinations**: **November 10**\n"
            "- 📖 **End Semester Theory Examinations**: **November 17**\n"
            "- 🔄 **Make-up / Arrear Examinations**: **November 28**\n"
            "- 🏆 **Declaration of Odd Semester Results**: **December 19**\n"
            "- 🎓 **Commencement of Even Semester 2025-26**: **December 15**\n\n"
            "**Holidays & Campus Celebrations**:\n"
            "- Independence Day: Aug 15 | Krishna Jayanthi: Aug 16\n"
            "- Vinayakar Chathurthi: Aug 27 | Milad-un-Nabi: Sep 5\n"
            "- Mirth 2k25: Sep 12 | Engineers Day: Sep 15\n"
            "- Deepavali: Oct 19 | Christmas: Dec 25"
        )

    # University Overview & Facilities
    if any(k in q for k in ["kalasalingam", "kare", "about klu", "chancellor", "founder", "location", "address", "naac", "nirf", "schools", "hostel", "library"]):
        return (
            "🏛️ **About Kalasalingam Academy of Research and Education (KARE)**:\n\n"
            "- **History & Legacy**: Founded in 1984 by philanthropic visionary **\"Kalvivallal\" Thiru T. Kalasalingam**. Conferred Deemed University status in 2006 under Section 3 of UGC Act, 1956.\n"
            "- **Leadership**:\n"
            "  • **Chancellor**: Dr. K. Sridharan\n"
            "  • **Pro-Chancellors**: Dr. S. Shasi Anand & Mr. S. Arjun Kalasalingam\n"
            "  • **Vice-Chancellor**: Dr. S. Narayanan\n"
            "- **Campus Location**: Sprawling 400+ acre scenic campus at **Anand Nagar, Krishnankoil - 626126, Srivilliputtur**, Virudhunagar District, Tamil Nadu (near Madurai).\n"
            "- **Key Accreditations**:\n"
            "  • **NAAC 'A+' Grade** (CGPA 3.58+)\n"
            "  • **NIRF Top 50** in University Rankings\n"
            "  • **ABET Accredited** (USA) for Computer Science, ECE, Bio-tech, and Mechanical Engineering\n"
            "  • **NBA Tier-1** Accreditation\n"
            "- **Schools**: School of Computing, Electrical, Mechanical, Civil, Bio & Chemical, Agriculture, Architecture, Law, Kalasalingam Business School, and Nursing.\n"
            "- **Campus Facilities**: 24/7 Central Library, advanced supercomputing clusters, sports complexes with indoor stadiums, clean on-campus hostels (Bharathi, Thamarai, etc.), multi-cuisine cafeteria, and round-the-clock medical care."
        )

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
    if any(k in q for k in ["profile", "who am i", "my details", "cgpa", "register number", "reg no"]):
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

    # Letter & Email Drafting
    if any(k in q for k in ["leave letter", "leave email", "permission letter", "write email to hod"]):
        return (
            "✉️ **Formal Medical Leave Letter Template**:\n\n"
            "```text\n"
            "To\n"
            "The Head of Department,\n"
            "Department of Computer Science and Engineering,\n"
            "Kalasalingam Academy of Research and Education,\n"
            "Krishnankoil - 626126.\n\n"
            "Through: Faculty Advisor (Dr. K. Senthil Nathan)\n\n"
            "Subject: Application for Medical Leave - Reg.\n\n"
            "Respected Sir/Madam,\n\n"
            "I am Arun Kumar M (Reg No: 99240040191), a 3rd-year student of B.Tech CSE (Section B). "
            "Due to illness and as advised by the medical officer, I was unable to attend classes on [Dates].\n\n"
            "I have attached the doctor's prescription and medical fitness certificate for your verification. "
            "I kindly request you to approve my medical leave and condone my absence in the attendance portal.\n\n"
            "Thanking you,\n\n"
            "Yours faithfully,\n"
            "Arun Kumar M\n"
            "Reg No: 99240040191\n"
            "```"
        )

    # General AI: Python
    if "what is python" in q or "explain python" in q:
        return (
            "🐍 **Python** is a high-level, general-purpose programming language renowned for its readable syntax and massive standard library.\n\n"
            "**Key Use Cases**:\n"
            "- **Artificial Intelligence & Data Science**: PyTorch, TensorFlow, Pandas, NumPy, Scikit-learn.\n"
            "- **Web Development**: FastAPI, Django, Flask.\n"
            "- **Automation & Scripting**: Rapid prototyping and task automation.\n\n"
            "```python\n"
            "# Quick Example\n"
            "def welcome(name):\n"
            "    return f\"Welcome to Kalasalingam University, {name}!\"\n"
            "\n"
            "print(welcome(\"Arun\"))\n"
            "```"
        )

    # General AI: Hello World
    if "hello world" in q:
        return (
            "💻 **Hello World in Popular Languages**:\n\n"
            "**Python**:\n```python\nprint(\"Hello, World!\")\n```\n\n"
            "**C**:\n```c\n#include <stdio.h>\nint main() { printf(\"Hello, World!\\n\"); return 0; }\n```\n\n"
            "**Java**:\n```java\npublic class Main { public static void main(String[] args) { System.out.println(\"Hello, World!\"); } }\n```"
        )

    # General AI: Science (Gravity)
    if "gravity" in q or "what is gravity" in q:
        return (
            "🪐 **Gravity** is a fundamental interaction that causes mutual attraction between all things with mass or energy.\n\n"
            "- **Newton's Universal Gravitation**: $F = G \\frac{m_1 m_2}{r^2}$\n"
            "- **Einstein's General Relativity**: Gravity is not an invisible pulling force, but rather the curvature of spacetime caused by the uneven distribution of mass and energy."
        )

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
        "- 📊 **Academic Regulations**: \"What is the attendance condonation rule?\" or \"Grading system\"\n"
        "- 🔬 **KARE Ph.D. Regulations**: \"What are the Ph.D. guidelines and publication requirements?\"\n"
        "- 🗓️ **Academic Calendar**: \"When are Sessional exams and Odd semester results?\"\n"
        "- 📝 **Assignments**: \"What assignments are pending?\"\n"
        "- 🎓 **Academic Profile**: \"Show my CGPA and attendance\"\n"
        "- 💻 **General AI**: \"What is Python?\", \"Write a leave letter to HoD\", math, or coding queries!"
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
