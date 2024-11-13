import requests
from bs4 import BeautifulSoup
import psycopg2
import re
import os

# PostgreSQL bağlantı URL'sini al (POSTGRES_URL çevre değişkeninden)


# Veritabanına bağlan
try:
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    print("Veritabanı bağlantısı başarılı.")
    
    # Burada gerekli sorguları veya işlemleri yapabilirsiniz
    
except psycopg2.DatabaseError as e:
    print(f"Veritabanına bağlanırken hata oluştu: {e}")


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
}

# Başlık temizleme fonksiyonu
def extract_game_title(title):
    match = re.match(r"^(.*?)(?:\s*[–+-].*)?$", title)
    if match:
        return match.group(1).replace(":","").replace("'", "’").strip()
    return title

# Veritabanına oyunu ekleyip, mevcutsa güncelleme fonksiyonu
def upsert_game(name, url, source):
    # Var olan bir oyunu kontrol edin
    print("Oyun adi:",name)
    cur.execute("SELECT id, xbox, torrent FROM games WHERE name = %s", (name,))
    game = cur.fetchone()
    
    if game:
        # Güncellemeyi gerçekleştirme
        game_id, xbox, torrent = game
        if source == 'xbox' and not xbox:
            cur.execute("UPDATE games SET xbox = TRUE, achievement_url = %s WHERE id = %s", (url, game_id))
        elif source == 'torrent' and not torrent:
            cur.execute("UPDATE games SET torrent = TRUE, torrent_url = %s WHERE id = %s", (url, game_id))
    else:
        # Yeni oyun ekleme
        achievement_url = url if source == 'xbox' else None
        torrent_url = url if source == 'torrent' else None
        xbox_value = source == 'xbox'
        torrent_value = source == 'torrent'
        
        cur.execute(
            "INSERT INTO games (name, achievement_url, torrent_url, xbox, torrent) VALUES (%s, %s, %s, %s, %s)",
            (name, achievement_url, torrent_url, xbox_value, torrent_value)
        )
    conn.commit()

# Xbox verilerini çekme ve veritabanına kaydetme
for page in range(1, 5):
    url = f"https://www.trueachievements.com/xbox-game-pass/games?page={page}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        table = soup.find('table', class_='maintable')
        if table:
            games = table.find_all('td', class_='game')
            for game in games:
                link = game.find('a')
                if link:
                    game_name = extract_game_title(link.text.strip())
                    game_url = link['href']
                    upsert_game(game_name, game_url, source='xbox')
    else:
        print(f"Veri çekilemedi: Sayfa {page}, Durum kodu: {response.status_code}")

# Torrent verilerini çekme ve veritabanına kaydetme
for page in range(1, 100):
    url = f"https://fitgirl-repacks.site/all-my-repacks-a-z/?lcp_page0={page}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        ul = soup.find('ul', class_='lcp_catlist')
        if ul:
            games = ul.find_all('li')
            for game in games:
                link = game.find('a')
                if link:
                    game_name = extract_game_title(link.text.strip())
                    game_url = link['href']
                    upsert_game(game_name, game_url, source='torrent')
    else:
        print(f"Veri çekilemedi: Sayfa {page}, Durum kodu: {response.status_code}")

cur.close()
conn.close()
