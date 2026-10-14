# Auth Testing Playbook — AVANI Foundation admin

## Step 1: MongoDB verification
```
mongosh test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`; indexes on users.email (unique), login_attempts.identifier.

## Step 2: API testing
```
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -c cookies.txt -X POST $API/api/admin/login -H "Content-Type: application/json" -d '{"email":"<ADMIN_EMAIL>","password":"<ADMIN_PASSWORD>"}'
cat cookies.txt   # access_token + refresh_token httpOnly cookies
curl -b cookies.txt $API/api/admin/me
curl -b cookies.txt -X PUT $API/api/admin/content/donate -H "Content-Type: application/json" -d '{"upi_id":"test@upi"}'
curl $API/api/content/donate   # public read reflects the change
```
Login returns the admin object and sets cookies; /me returns the admin; PUT persists; public GET reflects it.
Wrong password → 401; 5 wrong attempts → 423 lockout for 15 minutes.
