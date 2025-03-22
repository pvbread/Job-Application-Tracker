import sqlite3
import random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

conn = sqlite3.connect("../backend/db.sqlite3")
cursor = conn.cursor()

cursor.execute("DELETE FROM job_applications")
print("🧹 Cleared all job applications")

def random_date_between(start_days_ago, end_days_ago):
    days_ago = random.randint(start_days_ago, end_days_ago)
    return (datetime.now() - timedelta(days=days_ago)).date().isoformat()

total = 1000
success_count = 0

for _ in range(total):
    company = fake.company()
    reachedOutToRecruiter = random.choice([0, 1])
    timeSinceApplicationOpened = random.randint(1, 60)
    applicantsAlreadyApplied = random.randint(5, 1000)
    salaryRangeMidpoint = round(random.uniform(70000, 200000), 2)
    salaryRequestedMidpoint = salaryRangeMidpoint + round(random.uniform(-10000, 20000), 2)
    companyLocation = fake.city()
    dateApplied = random_date_between(1, 60)
    dateRejected = None if random.random() < 0.7 else random_date_between(0, 30)
    rejectedAtRound = None if not dateRejected else random.randint(1, 5)
    notes = fake.sentence()
    gptMatchScore = round(random.uniform(0.3, 0.99), 2)
    githubMatchingProject = random.choice([0, 1])

    isResumeTailored = 1 if random.random() < 0.4 else 0
    coverLetterIncluded = random.choices([0, 1, 2], weights=[0.6, 0.2, 0.2])[0]
    isReferral = 1 if random.random() < 0.3 else 0

    base_prob = 0.01
    if isResumeTailored:
        base_prob += 0.10
    if coverLetterIncluded == 2:
        base_prob += 0.03
    elif coverLetterIncluded == 1:
        base_prob += 0.015
    if isReferral:
        base_prob += 0.05
    if isResumeTailored and isReferral and coverLetterIncluded == 2:
        base_prob += 0.05  # synergy bonus

    is_success = random.random() < base_prob
    if is_success:
        technicalRoundsTaken = random.randint(1, 3)
        behavioralRoundsTaken = random.randint(1, 2)
        success_count += 1
    else:
        technicalRoundsTaken = 0
        behavioralRoundsTaken = 0

    cursor.execute("""
        INSERT INTO job_applications (
            company, isResumeTailored, coverLetterIncluded, isReferral,
            reachedOutToRecruiter, timeSinceApplicationOpened, applicantsAlreadyApplied,
            salaryRangeMidpoint, salaryRequestedMidpoint, companyLocation,
            dateApplied, dateRejected, rejectedAtRound,
            technicalRoundsTaken, behavioralRoundsTaken, notes,
            gptMatchScore, githubMatchingProject
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        company, isResumeTailored, coverLetterIncluded, isReferral,
        reachedOutToRecruiter, timeSinceApplicationOpened, applicantsAlreadyApplied,
        salaryRangeMidpoint, salaryRequestedMidpoint, companyLocation,
        dateApplied, dateRejected, rejectedAtRound,
        technicalRoundsTaken, behavioralRoundsTaken, notes,
        gptMatchScore, githubMatchingProject
    ))

conn.commit()
conn.close()

print(f"✅ Inserted {total} fake job applications")
print(f"🎯 {success_count} led to interviews ({(success_count / total) * 100:.1f}%)")
