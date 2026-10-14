"""
Backend tests for AVANI CMS — focus_areas & initiatives arrays on /api/content/site.

Covers:
- Admin login (cookie-based auth)
- Public GET /api/content/site
- Auth PUT /api/admin/content/site with focus_areas/initiatives
- Validation: max 12 items (13 => 422)
- Auth: PUT without cookies => 401
- Persistence verification via subsequent GET
- Regression: contact / hero / about / donate untouched
- Cleanup: reset focus_areas / initiatives back to [] at the end (public falls back to defaults)
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://avani-women.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "hello@avanifoundation.org"
ADMIN_PASSWORD = "A8GBWCC3VVc0oN"


@pytest.fixture(scope="module")
def anon():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{BASE_URL}/api/admin/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if r.status_code != 200:
        pytest.skip(f"Admin login failed: {r.status_code} {r.text}")
    assert "access_token" in s.cookies
    assert "refresh_token" in s.cookies
    return s


@pytest.fixture(scope="module")
def saved_pre_state(admin):
    """Snapshot pre-existing site content so we can restore non-list fields exactly."""
    r = admin.get(f"{BASE_URL}/api/content/site")
    assert r.status_code == 200
    return r.json()


def test_public_get_site_ok(anon):
    r = anon.get(f"{BASE_URL}/api/content/site")
    assert r.status_code == 200
    body = r.json()
    assert "contact" in body and "hero" in body and "about" in body
    assert "images" in body
    assert "focus_areas" in body
    assert "initiatives" in body
    assert isinstance(body["focus_areas"], list)
    assert isinstance(body["initiatives"], list)


def test_put_without_auth_401(anon, saved_pre_state):
    r = anon.put(f"{BASE_URL}/api/admin/content/site", json={**saved_pre_state, "focus_areas": [], "initiatives": []})
    assert r.status_code == 401


def test_put_focus_areas_initiatives_persists(admin, saved_pre_state):
    payload = {
        **saved_pre_state,
        "focus_areas": [
            {"icon": "cpu", "title": "TEST_AI Skills", "tagline": "TEST tagline", "text": "TEST detail"},
            {"icon": "sprout", "title": "TEST_Growth", "tagline": "TEST tag2", "text": "TEST detail2"},
        ],
        "initiatives": [
            {"icon": "rocket", "text": "TEST_Initiative one"},
            {"icon": "target", "text": "TEST_Initiative two"},
            {"icon": "coins", "text": "TEST_Initiative three"},
        ],
    }
    r = admin.put(f"{BASE_URL}/api/admin/content/site", json=payload)
    assert r.status_code == 200, r.text
    assert r.json().get("status") == "saved"

    # Verify via public GET
    g = requests.get(f"{BASE_URL}/api/content/site")
    assert g.status_code == 200
    data = g.json()
    assert len(data["focus_areas"]) == 2
    assert data["focus_areas"][0]["title"] == "TEST_AI Skills"
    assert data["focus_areas"][0]["icon"] == "cpu"
    assert len(data["initiatives"]) == 3
    assert data["initiatives"][2]["text"] == "TEST_Initiative three"


def test_put_13_focus_areas_rejected_422(admin, saved_pre_state):
    too_many = [{"icon": "sparkles", "title": f"T{i}", "tagline": "", "text": ""} for i in range(13)]
    payload = {**saved_pre_state, "focus_areas": too_many, "initiatives": []}
    r = admin.put(f"{BASE_URL}/api/admin/content/site", json=payload)
    assert r.status_code == 422, r.text


def test_put_13_initiatives_rejected_422(admin, saved_pre_state):
    too_many = [{"icon": "sparkles", "text": f"T{i}"} for i in range(13)]
    payload = {**saved_pre_state, "focus_areas": [], "initiatives": too_many}
    r = admin.put(f"{BASE_URL}/api/admin/content/site", json=payload)
    assert r.status_code == 422, r.text


def test_regression_donate_untouched(anon):
    r = anon.get(f"{BASE_URL}/api/content/donate")
    assert r.status_code == 200
    data = r.json()
    for k in ("account_name", "account_number", "ifsc", "bank_branch", "upi_id"):
        assert k in data


def test_empty_arrays_fall_back(admin, saved_pre_state):
    # Save with empty arrays — public still returns empty arrays (frontend falls back)
    payload = {**saved_pre_state, "focus_areas": [], "initiatives": []}
    r = admin.put(f"{BASE_URL}/api/admin/content/site", json=payload)
    assert r.status_code == 200
    g = requests.get(f"{BASE_URL}/api/content/site")
    assert g.status_code == 200
    data = g.json()
    assert data["focus_areas"] == []
    assert data["initiatives"] == []
    # Regression: hero/about/contact preserved
    assert data["contact"] == saved_pre_state["contact"]
    assert data["hero"] == saved_pre_state["hero"]
    assert data["about"] == saved_pre_state["about"]


def test_zz_cleanup_reset_lists(admin, saved_pre_state):
    """Final cleanup — ensure lists are reset to empty so site falls back to defaults."""
    payload = {**saved_pre_state, "focus_areas": [], "initiatives": []}
    r = admin.put(f"{BASE_URL}/api/admin/content/site", json=payload)
    assert r.status_code == 200
    g = requests.get(f"{BASE_URL}/api/content/site")
    assert g.json()["focus_areas"] == []
    assert g.json()["initiatives"] == []
