# Testing Guide

## Manual Testing Checklist

### Authentication Flow

- [ ] Register with valid credentials
- [ ] Register with duplicate email (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Access protected routes without token (should fail)
- [ ] Access protected routes with valid token (should succeed)

### Activity Management

- [ ] Create transport activity (car, flight, bus)
- [ ] Create energy activity (electricity, gas)
- [ ] Create diet activity (beef, chicken, vegetarian, vegan)
- [ ] View all activities
- [ ] Edit an activity
- [ ] Delete an activity
- [ ] Verify calculations are correct

### Dashboard

- [ ] View daily summary
- [ ] View weekly summary
- [ ] View monthly summary
- [ ] Check trend chart displays correctly
- [ ] Check category breakdown chart
- [ ] Verify period comparison works

### AI Recommendations

- [ ] Generate recommendations with activities
- [ ] Verify recommendations are personalized
- [ ] Check recommendations without activities

## Test Data

### Sample Activities

```json
{
  "type": "transport",
  "category": "car",
  "value": 50,
  "unit": "km",
  "date": "2026-02-05"
}
```

```json
{
  "type": "energy",
  "category": "electricity",
  "value": 100,
  "unit": "kWh",
  "date": "2026-02-05"
}
```

```json
{
  "type": "diet",
  "category": "beef",
  "value": 1,
  "unit": "meals",
  "date": "2026-02-05"
}
```

### Expected Calculations

- Car (50 km): 50 × 0.12 = 6.0 kg CO₂
- Electricity (100 kWh): 100 × 0.5 = 50.0 kg CO₂
- Beef (1 meal): 6.0 kg CO₂

**Total: 62.0 kg CO₂**

## API Testing with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create Activity

```bash
curl -X POST http://localhost:5000/api/activities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"type":"transport","category":"car","value":50,"unit":"km"}'
```

### Get Dashboard Summary

```bash
curl http://localhost:5000/api/activities/dashboard/summary?period=weekly \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get AI Recommendations

```bash
curl http://localhost:5000/api/ai/recommendations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Browser Testing

### Supported Browsers

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

### Responsive Testing

- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

## Performance Checks

- [ ] Dashboard loads in < 2 seconds
- [ ] AI recommendations generate in < 5 seconds
- [ ] Activity list loads in < 1 second
- [ ] Charts render smoothly

## Known Limitations

- OpenAI API requires valid key and has rate limits
- MongoDB must be running
- Frontend uses local storage for token (not secure for production)

## Debugging Tips

### Check Backend Logs

```bash
# In terminal running backend
# Look for errors in console output
```

### Check Browser Console

```bash
# Open Developer Tools (F12)
# Check Console tab for errors
# Check Network tab for API calls
```

### Verify MongoDB Data

```bash
mongosh
use carbon-calculator
db.activities.find()
db.users.find()
```
