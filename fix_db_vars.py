with open('/Users/juderozario/projects/judesPortfolio/src/data/radiusSystemArchitecture.ts', 'r') as f:
    text = f.read()

replacements = {
    "'Extracts and cryptographically verifies Bearer JWTs, checks Redis revocation blacklist, and injects store_id/user_id into request context.'": "'Extracts and cryptographically verifies Bearer JWTs, checks Redis revocation blacklist, and injects `store_id`/`user_id` into request context.'",
    "'Keys include session:<id>, blacklist:<session_id>, and is4tc_session:<store_id>:<upc>.'": "'Keys include `session:<id>`, `blacklist:<session_id>`, and `is4tc_session:<store_id>:<upc>`.'",
    "'Injects verified store_id, user_id, and 5-second deadline context into request pipeline.'": "'Injects verified `store_id`, `user_id`, and 5-second deadline context into request pipeline.'",
    "'Central event broker maintaining isolated client connection pools per store: map[store_id]map[*Client]bool.'": "'Central event broker maintaining isolated client connection pools per store: `map[store_id]map[*Client]bool`.'"
}

for k, v in replacements.items():
    if k not in text:
        print(f"Warning: could not find key {k}")
    text = text.replace(k, v)

with open('/Users/juderozario/projects/judesPortfolio/src/data/radiusSystemArchitecture.ts', 'w') as f:
    f.write(text)
