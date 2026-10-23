// Aquí se cambian los platos y precios. No hace falta tocar otro archivo.

const menu = {
  nombre: "Menú",
  entradas: ["Sopa wantán", "Wantán frito"],
  fondos: [
    { nombre: "Chaufa de pollo", precio: 12 },
    { nombre: "Chaufa de chancho", precio: 14 },
    { nombre: "Chaufa de carne", precio: 14 },
    { nombre: "Tallarín saltado de pollo", precio: 13 },
    { nombre: "Tallarín saltado de chancho", precio: 14 },
    { nombre: "Tallarín saltado de carne", precio: 14 },
    { nombre: "Aeropuerto de pollo", precio: 14 },
    { nombre: "Aeropuerto de chancho", precio: 15 },
    { nombre: "Aeropuerto de carne", precio: 15 },
    { nombre: "Combinado de pollo", precio: 15 },
    { nombre: "Combinado de chancho", precio: 16 },
    { nombre: "Combinado de carne", precio: 16 },
    { nombre: "Pollo con durazno", precio: 14 },
    { nombre: "Pollo con verdura", precio: 14 },
    { nombre: "Combinado kaypi", precio: 16 },
    { nombre: "Tipakay + chaufa", precio: 14 },
    { nombre: "Chijaukay + chaufa", precio: 14 },
    { nombre: "Tortilla de verduras", precio: 13 },
    { nombre: "Tortilla de pollo", precio: 14 }
  ]
};

// Carta: se agrupa en secciones. Bebidas: faltan los datos del cliente.
// Para agregar un plato: p("Nombre", precio, "descripción opcional")
const p = (nombre, precio, descripcion = "") => ({ nombre, descripcion, precio });

const categorias = [
  {
    nombre: "Carta",
    secciones: [
      { titulo: "Pollos a la brasa", platos: [
        p("1 pollo a la brasa + chaufa", 55),
        p("1/2 pollo a la brasa", 29),
        p("1/4 pollo a la brasa", 16),
        p("1/8 pollo a la brasa", 10),
        p("Mostrito", 13, "1/8 de pollo a la brasa + papas fritas + chaufa + ensalada"),
        p("Mostro", 20, "1/4 de pollo a la brasa + papas fritas + chaufa + ensalada")
      ]},
      { titulo: "Combos criollos", platos: [
        p("Alitas broaster", 18, "Con papas fritas + chaufa + ensalada"),
        p("Mollejitas fritas", 18, "Con papas fritas + chaufa + ensalada"),
        p("Pollo a la plancha", 18, "Con papas fritas + chaufa + ensalada"),
        p("Chicharrón de pollo crocante", 18, "Con chaufa + papas fritas y ensalada")
      ]},
      { titulo: "Combos orientales", platos: [
        p("Alitas bbq + 4 wantanes rellenos", 19, "Con chaufa"),
        p("Alitas kaypi", 19, "Con papas fritas + chaufa + ensalada"),
        p("Sopa wantán + chaufa", 19),
        p("Sopa de kion + aeropuerto", 19),
        p("Tipakay + alita kaypi + chaufa", 19),
        p("Chijaukay + alitas bbq + chaufa", 19),
        p("Alitas kaypi + alitas bbq", 20, "Con chaufa + papas fritas"),
        p("Alitas picante + alitas acevichadas", 20, "Con chaufa + papas fritas"),
        p("Alitas crocante + chaufa", 20, "Con papas fritas + ensalada")
      ]},
      { titulo: "Arroz chaufa", platos: [
        p("Chaufa de pollo", 12), p("Chaufa de chancho", 17), p("Chaufa de carne", 17),
        p("Chaufa de langostinos", 20), p("Chaufa especial", 24), p("Chaufa de pollo + chancho", 21),
        p("Chaufa brasa", 15), p("Chaufa con champiñones", 16), p("Chaufa salvaje", 16),
        p("Chaufa vegetariano", 13)
      ]},
      { titulo: "Aeropuerto", platos: [
        p("Aeropuerto de pollo", 15), p("Aeropuerto de chancho", 18), p("Aeropuerto de carne", 18),
        p("Aeropuerto de langostinos", 21), p("Aeropuerto especial", 25), p("Aeropuerto con champiñones", 18)
      ]},
      { titulo: "Pollo + chaufa", platos: [
        p("Pollo con verduras", 16), p("Pollo con durazno", 18), p("Pollo con piña", 18),
        p("Pollo chi jau kay", 18), p("Pollo tipakay", 18), p("Pollo limón kay", 18),
        p("Enrollado de pollo con verduras", 20, "En salsa de ostión"),
        p("Pollo enrollado especial", 28)
      ]},
      { titulo: "Tallarines", platos: [
        p("Tallarín saltado de pollo", 15), p("Tallarín saltado de carne", 17),
        p("Tallarín saltado de chancho", 17), p("Tallarín saltado de langostinos", 21),
        p("Tallarín saltado especial", 25), p("Tallarín mixto", 22, "Pollo + chancho")
      ]},
      { titulo: "Tortillas + chaufa", platos: [
        p("Tortilla de pollo", 15), p("Tortilla de verduras", 13), p("Tortilla de langostinos", 20),
        p("Tortilla especial", 25), p("Tortilla de pollo con verduras", 18)
      ]},
      { titulo: "Platos especiales", platos: [
        p("Aerochijaukay", 20), p("Aerotipakay", 20),
        p("Chancho asado", 22, "En salsa de tamarindo"),
        p("Saltado taypa", 25), p("Aero brasa", 18), p("Kam lu wantán", 26), p("Aero lomo saltado", 25),
        p("Chancho con piña y verduras", 23, "En salsa de tamarindo"),
        p("Aeropuerto taypa sobre tortilla", 23), p("Pollo agridulce", 17)
      ]},
      { titulo: "Combinados", platos: [
        p("Combinado de pollo", 16), p("Combinado de chancho", 20), p("Combinado de carne", 20),
        p("Combinado mixto", 23, "Pollo + chancho"), p("Combinado especial", 26),
        p("Aero combinado de pollo", 21)
      ]},
      { titulo: "Sopas", platos: [
        p("Sopa wantán con pollo", 11), p("Sopa wantán especial", 16),
        p("Sopa de kion con pollo", 12), p("Sopa fuchifu", 12)
      ]}
    ]
  }
  ,
  // BEBIDAS DE EJEMPLO: los nombres y precios son inventados.
  // Reemplázalos cuando el cliente pase su lista real.
  {
    nombre: "Bebidas",
    secciones: [
      { titulo: "Refrescos", platos: [
        p("Chicha morada (jarra)", 14),
        p("Limonada (jarra)", 14),
        p("Maracuyá (jarra)", 14),
        p("Vaso de chicha o limonada", 4)
      ]},
      { titulo: "Gaseosas", platos: [
        p("Inca Kola personal", 4),
        p("Coca-Cola personal", 4),
        p("Inca Kola de 1.5 L", 9),
        p("Agua mineral", 3)
      ]} 
    ]
  }
];

// DATOS DEL LOCAL (de ejemplo: cámbialos por los reales del cliente)
const local = {
  nombre: "El Mandarín",
  direccion: "Av. Zarumilla 095, Chiclayo 14011",
  horario: "Todos los días, de 12:00 p. m. a 11:00 p. m.",
  telefono: "920 132 097",         
  whatsapp: "51920132097"          
};