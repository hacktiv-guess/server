# server

room: [
    {
        players: []
    },
    {
        players: []
    }
]

set: [
    ['up', 'up', 'down', 'right', 'right', 'up', 'left'],
    [],
    [],
    []
]

========================================
========================================

# client

1. Masukin nama
2. Lalu kebuka list room, disini bisa pilih room yang mao dimasukin atau bisa bikin room baru
3. Abis buka room, nunggu ada user masuk
4. Setelah ada user masuk, bisa pencet start, pindah ke halaman game
5. Di halaman game, hitung 3 2 1, lalu game start.
6. Kalo ada yang finish, volumenya di bikin fading away, terus munculin siapa yang menang.
7. Tendang balik ke list room

1. gak ada event
2.
    fetch room,
    create room,
    join room
3. ga ada
4. start room (update roomnya jadi gamenya jalan)
5.
    fetch set,
    emit set selesai pas pencet spasi -> server terima, lalu emit ke musuhnya karakter lu joget,
    kalo salah pencet clientnya emit salah pencet -> jadi munculin karakternya geleng2 kepala
6. finish -> client emit finish, socket broadcast kasi tau kalo dah menang -> setelah nerima info dr server kalo uda ada yg menang -> tendang ke room list

========================================

vuex
states

player: ''
rooms: [],
set: []

========================================

pages:

1. halaman isi username
2. lobby:
    card-room
    tombol create
3. halaman nunggu:
    avatar karakter1, avatar karakter2,
    tombol start(disabled, enabled kalo uda 2 orang)
4. halaman game:
    avatar karakter1, avatar karakter2
    munculin setnya


==========================================


1. lagu
2. avatar
3. gif dance