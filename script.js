// Simpan elemen DOM ke dalam variabel
const passwordForm = document.getElementById('passwordForm');
const appNameInput = document.getElementById('appName');
const appPasswordInput = document.getElementById('appPassword');
const passwordList = document.getElementById('passwordList');

// Ambil data dari localStorage saat pertama kali
let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

// Fungsi untuk menyimpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem('passwords', JSON.stringify(passwords));
}

// Fungsi untuk memperbarui daftar sandi
function updatePasswordList() {
  passwordList.innerHTML = '';
  passwords.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${item.app}</strong>: ${item.password}</span>
      <button onclick="deletePassword(${index})">Hapus</button>
    `;
    passwordList.appendChild(li);
  });
}

// Fungsi untuk menambahkan sandi baru
passwordForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const appName = appNameInput.value.trim();
  const appPassword = appPasswordInput.value.trim();

  if (appName && appPassword) {
    passwords.push({ app: appName, password: appPassword });
    saveToLocalStorage();
    updatePasswordList();
    appNameInput.value = '';
    appPasswordInput.value = '';
  }
});

// Fungsi untuk menghapus sandi
function deletePassword(index) {
  passwords.splice(index, 1);
  saveToLocalStorage();
  updatePasswordList();
}

// Perbarui daftar sandi saat pertama kali
updatePasswordList();

// ** Tambahkan kode berikut untuk mendaftarkan service worker **
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => console.log("Service Worker registered successfully"))
    .catch((error) => console.error("Service Worker registration failed:", error));
}