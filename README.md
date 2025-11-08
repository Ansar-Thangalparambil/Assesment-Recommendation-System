## **SHL Assessment Recommendation System**

  A GenAI-powered engine that recommends the most relevant SHL individual assessments based on natural-language job descriptions or queries.
  This system enables hiring managers and recruiters to quickly identify the right SHL tests without manually searching the SHL catalog.

##**✅ Features**

  Accepts natural-language job descriptions, skills, or URLs
  
  Recommends 5–10 relevant SHL individual assessments
  
  Each result includes:
  
  Assessment Name
  
  SHL Catalog URL
  
  Similarity Score
  
  Balanced recommendations across technical and behavioral categories
  
  REST API powered by FastAPI
  
  Interactive frontend using HTML, CSS, and JavaScript
  
  Fully meets all problem requirements in SHL's GenAI Task Specification

##**✅ System Architecture**
  User Query → FastAPI Backend → TF-IDF Vectorizer → Cosine Similarity → Top-K Scores → Frontend Display

##**✅ Project Workflow**
  **1. Data Preparation**
  
  Crawled SHL Product Catalog
  
  Cleaned dataset and extracted individual test solutions only
  
  Removed pre-packaged job solutions
  
  Stored data in:
  
  assessments_catalogue.csv

  SHL_Recommendations.csv

  **2. Model Pipeline**

  Used TF-IDF Vectorizer to convert assessment descriptions into embeddings
  
  Calculated similarities using Cosine Similarity
  
  Saved trained components:
  
  vectorizer.pkl
  
  vectors.pkl

  **3. Backend (FastAPI)**

  Endpoints:
  
  /health → API status check
  
  /recommend → accepts text query, returns JSON results
  
  CORS enabled for frontend compatibility
  
  Lightweight, fast server using Uvicorn

  **4. Frontend**

  Simple and clean UI
  
  Built using:
  
  HTML (structure)
  
  CSS (styling)
  
  JavaScript (API fetch + rendering)
  
  Displays recommendations in a dynamic table


##**✅ API Documentation**
  1. Health Check
  
    GET /health
  
    Response
    
    { "status": "ok" }
  
  2. Recommendation Endpoint
     
    POST /recommend
  
    Request Body
   
      {
      "query": "java developer proficient in teamwork"
      }
    
      Sample Response
      {
      "results": [
        {
          "assessment_url": "https://www.shl.com/solutions/products/product-catalog/view/java-8-new/",
          "score": 0.8703
        },
        {
          "assessment_url": "https://www.shl.com/solutions/products/product-catalog/view/core-java-entry-level-new/",
          "score": 0.5007
        }
      ]
      }

## **📁 Folder Structure**

      📦 Assessment-Recommendation-System
    │
    ├── backend/
    │   ├── api.py
    │   ├── vectorizer.pkl
    │   ├── vectors.pkl
    │   ├── assessments_catalogue.csv
    │   └── SHL_Recommendations.csv
    │
    ├── frontend/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    ├── .venv/
    ├── README.md
    └── recommendation_engine.ipynb

  
## **✅ How to Run Locally**
   
      1. Clone the Repository
         git clone https://github.com/Ansar_Thangalparambil/Assessment-Recommendation-System.git
        cd Assessment-Recommendation-System
      2. Create Virtual Environment
        python -m venv .venv
        source .venv/bin/activate     # Mac/Linux
        .venv\Scripts\activate        # Windows
      3. Install Dependencies
          pip install -r requirements.txt
      4. Start Backend
          uvicorn api:app --reload
      5. Start Frontend
          cd frontend
          python -m http.server 5500

## **👨‍💻 Author**

  **Ansar Thangalparambil**


      

      

    







