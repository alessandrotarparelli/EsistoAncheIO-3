# EsistoAncheIO

Piattaforma full-stack per il monitoraggio integrato di indicatori scolastici, comportamentali e socio-familiari, con un motore di supporto decisionale che segnala situazioni compatibili con un rischio ADHD.

## Nota importante

La piattaforma **non effettua diagnosi mediche**. Il sistema produce un **indice di attenzione clinico-educativa** e suggerisce un approfondimento con insegnanti, pediatra, famiglia e specialisti. Ogni valutazione clinica deve essere effettuata da professionisti qualificati.

## Stack

- Frontend: React + Vite + JavaScript
- Backend: Flask + SQLAlchemy
- Database: Supabase PostgreSQL (connessione via `DATABASE_URL`)

## Struttura

- `frontend/`: interfaccia web per dashboard, studenti e segnalazioni
- `backend/`: API REST Flask con SQLAlchemy e motore di scoring

## Avvio rapido

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask --app run.py --debug run
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
npm run lint
```

## Variabili ambiente principali

### Backend

- `DATABASE_URL`: stringa di connessione Supabase/PostgreSQL
- `FLASK_ENV`: ambiente Flask
- `CORS_ORIGINS`: origini consentite separate da virgola

### Frontend

- `VITE_API_BASE_URL`: URL del backend Flask

## Esempio DATABASE_URL Supabase

```env
DATABASE_URL=postgresql+psycopg2://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

## Funzionalità incluse

- gestione studenti
- osservazioni didattiche e comportamentali
- registrazione assenze, ritardi e andamento scolastico
- indicatori clinico-comportamentali e socio-familiari
- calcolo rischio con soglie configurate lato backend
- alert per insegnante o pediatra
- timeline degli interventi collaborativi

## API principali

- `GET /api/health`
- `GET /api/students`
- `POST /api/students`
- `GET /api/students/<id>`
- `POST /api/students/<id>/screenings`
- `GET /api/alerts`
- `GET /api/dashboard`

## Zip finale

Il progetto viene impacchettato in `EsistoAncheIO.zip`.

## Styling frontend

- gli stili custom restano in `frontend/src/styles/main.css`
- il frontend usa dati mock locali per la demo visuale


## Frontend quality

- ESLint e configurato in `frontend/eslint.config.js`
- esegui `npm run lint` dentro `frontend/` per controllare il codice
