import json
import argparse
from bson.objectid import ObjectId
from json import JSONEncoder
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super(CustomJSONEncoder, self).default(obj)


def recommend_similar_jobs(job_offers, opened_job_id, num_recommendations=2):
    # Create a combined text attribute from the title and company
    for job in job_offers:
        job["combined_text"] = f"{job['title']} {job['company']}"

    # Extract the combined text for each job offer
    combined_text = [job["combined_text"] for job in job_offers]

    # Calculate the TF-IDF matrix
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(combined_text)

    # Compute the cosine similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix)

    # Get the index of the opened job offer in the job_offers list
    opened_job_index = [i for i, job in enumerate(job_offers) if str(job["_id"]) == opened_job_id][0]

    # Get the cosine similarity scores for the opened job offer
    sim_scores = list(enumerate(cosine_sim[opened_job_index]))

    # Sort the job offers by their similarity scores in descending order
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the indices of the most similar job offers
    most_similar_indices = [i for i, _ in sim_scores[1:num_recommendations+1]]

    # Get the IDs of the most similar job offers
    recommended_job_ids = [str(job_offers[i]["_id"]) for i in most_similar_indices]

    return recommended_job_ids



# Modify the main function like this
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("opened_job_id", help="Job ID of the opened job")
    parser.add_argument("all_jobs", help="JSON string of all jobs")
    args = parser.parse_args()

    # Parse the command line arguments
    opened_job_id = args.opened_job_id
    all_jobs = json.loads(args.all_jobs)

    # Get recommended job IDs
    recommended_job_ids = recommend_similar_jobs(all_jobs, opened_job_id)

    # Print the recommended job IDs as JSON
    print(json.dumps(recommended_job_ids))

if __name__ == "__main__":
    main()