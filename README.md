# Repository Pattern Starter

A minimal Node.js auth starter using the repository pattern.

## Get Started

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open the project and build your feature on top of the existing structure.

## Project Structure

- `app.js` – application entry point
- `controllers/` – request handlers
- `services/` – business logic
- `repositories/` – data access layer
- `models/` – application models
- `routes/` – API routing
- `middlewares/` – middleware functions
- `utils/` – utility modules

## Notes

- Environment variables are managed with `.env`
- Logs are stored in `logs/`
- Use the repository pattern to keep data access separate from business logic
