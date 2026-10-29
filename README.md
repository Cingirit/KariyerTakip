# KariyerTakip — İş Başvurusu Takip Sistemi

KariyerTakip, iş arama sürecini daha düzenli yönetmek ve yapılan iş başvurularını tek bir yerde takip etmek amacıyla geliştirilmiş bir web uygulamasıdır.

Bu proje; React ile arayüz geliştirme, yeniden kullanılabilir bileşenler oluşturma, durum yönetimi ve duyarlı tasarım konularında pratik yapmak amacıyla geliştirilmiştir.

## Özellikler

- **Genel Bakış Paneli:** Toplam başvuru sayısını, mülakatları, teklifleri ve son başvuruları görüntüleme.
- **Başvuru Yönetimi:** Yeni başvuru ekleme, mevcut başvuruları düzenleme, detaylarını görüntüleme ve silme.
- **Kanban Panosu:** Başvuruları durumlarına göre sütunlarda düzenleme ve sürükle-bırak yöntemiyle durum değiştirme.
- **Arama ve Filtreleme:** Şirket adına veya pozisyona göre arama yapma ve başvuru durumuna göre filtreleme.
- **Başvuru Detayları:** Başvuru notlarını ve ilan bağlantılarını görüntüleme.
- **Veri Saklama:** Tarayıcının LocalStorage özelliği sayesinde sayfa yenilendiğinde başvuru verilerini koruma.
- **Duyarlı Tasarım:** Masaüstü ve mobil ekranlara uyumlu arayüz.

## Kullanılan Teknolojiler

- **React:** Kullanıcı arayüzü geliştirme
- **JavaScript:** Uygulama mantığı
- **Vite:** Geliştirme ortamı ve derleme
- **Tailwind CSS:** Arayüz stillendirme
- **React Router:** Sayfalar arası yönlendirme
- **LocalStorage:** Başvuru verilerini tarayıcıda saklama

## Başvuru Durumları

Başvurular aşağıdaki durumlara göre takip edilebilir:

- Başvuruldu
- İnceleniyor
- Mülakat
- Teklif
- Reddedildi

## Kurulum ve Çalıştırma

### Gereksinimler

- [Node.js](https://nodejs.org/)
- npm

### 1. Depoyu klonlayın

Aşağıdaki komutta `GITHUB_KULLANICI_ADINIZ` bölümünü kendi GitHub kullanıcı adınızla değiştirin.

```bash
git clone https://github.com/GITHUB_KULLANICI_ADINIZ/KariyerTakip.git
```

### 2. Proje klasörüne girin

```bash
cd KariyerTakip
```

### 3. Bağımlılıkları yükleyin

```bash
npm install
```

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcınızda açarak uygulamayı kullanabilirsiniz.

## Veri Saklama

Uygulama şu anda verileri tarayıcının LocalStorage alanında saklamaktadır. Bu sayede sayfa yenilendiğinde veriler korunur. Ancak veriler bir sunucuya aktarılmaz ve farklı cihazlar arasında otomatik olarak eşitlenmez.

## Projenin Amacı

KariyerTakip, React ve JavaScript becerilerimi geliştirmek, gerçek bir ihtiyaca yönelik uygulama oluşturmak ve yazılım geliştirme alanındaki portföyümü güçlendirmek amacıyla geliştirdiğim bir projedir.

**Proje durumu:** Geliştirme aşamasında.
