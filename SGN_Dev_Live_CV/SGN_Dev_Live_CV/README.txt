SGN Dev Live Neon CV
======================

Structure:
- app.py              : Flask entrypoint
- requirements.txt    : Python dependencies
- templates/index.html: Main live CV page
- static/css/style.css: Neon theme & layout
- static/js/main.js   : Animations & interactivity
- static/img/sgn_logo.png : PLACEHOLDER (add your real logo here)
- static/files/Sihle_SGN_Dev_CV.pdf : PLACEHOLDER (add your real CV PDF here)

To run:

python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

Then open http://127.0.0.1:5000 in your browser.
