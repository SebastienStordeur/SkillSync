from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

job_offers = [
    {"id": 1, "title": "Software Engineer", "company": "TechCorp"},
    {"id": 2, "title": "Data Scientist", "company": "DataSolutions"},
    {"id": 3, "title": "Software Engineer", "company": "AmazingSoftware"},
    {"id": 4, "title": "Product Manager", "company": "InnovateTech"},
    {"id": 5, "title": "Web Developer", "company": "WebWorld"},
    {"id": 6, "title": "Data Analyst", "company": "DataSolutions"},
    {"id": 7, "title": "Software Engineer", "company": "InnovateTech"},
    {"id": 8, "title": "Product Manager", "company": "TechCorp"},
    {"id": 9, "title": "Data Scientist", "company": "AmazingSoftware"},
    {"id": 10, "title": "Web Developer", "company": "WebWorld"},
]



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
    opened_job_index = [i for i, job in enumerate(job_offers) if job["id"] == opened_job_id][0]

    # Get the cosine similarity scores for the opened job offer
    sim_scores = list(enumerate(cosine_sim[opened_job_index]))

    # Sort the job offers by their similarity scores in descending order
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the indices of the most similar job offers
    most_similar_indices = [i for i, _ in sim_scores[1:num_recommendations+1]]

    # Get the IDs of the most similar job offers
    recommended_job_ids = [job_offers[i]["id"] for i in most_similar_indices]

    return recommended_job_ids


opened_job_id = 5
recommended_jobs = recommend_similar_jobs(job_offers, opened_job_id)
print(f"Recommended jobs for job offer {opened_job_id}: {recommended_jobs}")