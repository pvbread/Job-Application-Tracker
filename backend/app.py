from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

DB_PATH = 'db.sqlite3'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/data', methods=['GET'])
def get_data():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM job_applications').fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route('/api/job-applications', methods=['POST'])
def insert_job_application():
    data = request.json

    clean_data = {
        **data,
        'isResumeTailored': int(data.get('isResumeTailored', False)),
        'isReferral': int(data.get('isReferral', False)),
        'reachedOutToRecruiter': int(data.get('reachedOutToRecruiter', False)),
        'githubMatchingProject': int(data.get('githubMatchingProject', False))
    }

    sql = '''
    INSERT INTO job_applications (
        company, isResumeTailored, coverLetterIncluded, isReferral,
        reachedOutToRecruiter, timeSinceApplicationOpened, applicantsAlreadyApplied,
        salaryRangeMidpoint, salaryRequestedMidpoint, companyLocation,
        dateApplied, dateRejected, rejectedAtRound,
        technicalRoundsTaken, behavioralRoundsTaken, notes,
        gptMatchScore, githubMatchingProject
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    '''

    values = tuple(clean_data.get(k) for k in [
        'company', 'isResumeTailored', 'coverLetterIncluded', 'isReferral',
        'reachedOutToRecruiter', 'timeSinceApplicationOpened', 'applicantsAlreadyApplied',
        'salaryRangeMidpoint', 'salaryRequestedMidpoint', 'companyLocation',
        'dateApplied', 'dateRejected', 'rejectedAtRound',
        'technicalRoundsTaken', 'behavioralRoundsTaken', 'notes',
        'gptMatchScore', 'githubMatchingProject'
    ])

    try:
        conn = get_db_connection()
        conn.execute(sql, values)
        conn.commit()
        conn.close()
        return jsonify({'message': 'Inserted successfully'})
    except Exception as e:
        print("Insert error:", e)
        return jsonify({'error': 'Database insert failed'}), 500

@app.route('/api/upload-csv', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    df = pd.read_csv(file)

    # Normalize boolean fields
    for col in ['isResumeTailored', 'isReferral', 'reachedOutToRecruiter', 'githubMatchingProject']:
        if col in df.columns:
            df[col] = df[col].apply(lambda x: 1 if bool(x) else 0)

    try:
        conn = get_db_connection()
        for _, row in df.iterrows():
            conn.execute('''
                INSERT INTO job_applications (
                    company, isResumeTailored, coverLetterIncluded, isReferral,
                    reachedOutToRecruiter, timeSinceApplicationOpened, applicantsAlreadyApplied,
                    salaryRangeMidpoint, salaryRequestedMidpoint, companyLocation,
                    dateApplied, dateRejected, rejectedAtRound,
                    technicalRoundsTaken, behavioralRoundsTaken, notes,
                    gptMatchScore, githubMatchingProject
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', tuple(row[k] for k in [
                'company', 'isResumeTailored', 'coverLetterIncluded', 'isReferral',
                'reachedOutToRecruiter', 'timeSinceApplicationOpened', 'applicantsAlreadyApplied',
                'salaryRangeMidpoint', 'salaryRequestedMidpoint', 'companyLocation',
                'dateApplied', 'dateRejected', 'rejectedAtRound',
                'technicalRoundsTaken', 'behavioralRoundsTaken', 'notes',
                'gptMatchScore', 'githubMatchingProject'
            ]))
        conn.commit()
        conn.close()
        return jsonify({'message': 'CSV uploaded successfully'})
    except Exception as e:
        print("CSV insert error:", e)
        return jsonify({'error': 'Bulk insert failed'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3001)
