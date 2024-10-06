document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Robusta Brazil",
        img: "robusta-brazil.jpg",
        price: 30000,
      },
      { id: 2, name: "Arabica Blend", img: "arabica-blend.jpg", price: 25000 },
      { id: 3, name: "Primo Passo", img: "primo-passo.jpg", price: 33000 },
      { id: 4, name: "Aceh Gayo", img: "aceh-gayo.jpg", price: 35000 },
      {
        id: 5,
        name: "Sumatera Mandheling",
        img: "sumatera-mandheling.jpg",
        price: 40000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang sama dio cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada /cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
        console.log(this.total);
      } else {
        //jika barang sudah ada, cek apakah barang sama atau beda dengan yang ada di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      //ambil item yang mau di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari satu
      if (cartItem.quantity > 1) {
        //telusuri 1 1
        this.items = this.items.map((item) => {
          //jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id != id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// rupiah convertion
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
