import { Component, HostListener, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service'
import { Libro } from '../../models/libros'

type LibrosAgrupados = { [tituloEditorial: string]: boolean };


@Component({
selector: 'app-libros-list',
templateUrl: './libros-list.component.html',
styleUrls: ['./libros-list.component.css']
})
export class LibrosListComponent implements OnInit {

libros: any = [];
filteredLibros: Libro[] = [];
filtroTitulo = '';
filtroId = '';
selectedLibro: Libro | undefined;
librosAgrupadosConConteo: any;
showScrollButton: boolean = false;


constructor(private librosService: LibrosService){}

ngOnInit(): void {
    this.getLibros();
}

@HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 100) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

getLibros(){
  this.librosService.getLibros().subscribe((data: Libro[]) => {
    this.libros = data;
    this.filteredLibros = data;
    this.buscarLibros();
  });
}

buscarLibrosPorId(id: number) {
  this.filteredLibros = this.libros.filter((libro: Libro) => {
    const busqueda = id.toString().toLowerCase().trim();
    return (
      libro.idappedagogica?.toString().toLowerCase().includes(busqueda)
    );
    
  });
  if (this.buscarLibros) {
    this.buscarLibros();
  }
  
}

mostrarLibrosPorId(id: number): void {
  const librosMostrados: LibrosAgrupados = {};
  this.filteredLibros = this.libros.filter((libro: Libro) => {
    if (libro.idappedagogica !== id) {
      return false;
    }
    const tituloEditorial = libro.titulo + libro.editorial + libro.image;
    if (librosMostrados[tituloEditorial]) {
      return false;
    }
    librosMostrados[tituloEditorial] = true;
    const busqueda = this.filtroTitulo.toLowerCase().trim();
    return (
      libro.titulo?.toLowerCase().includes(busqueda) ||
      libro.editorial?.toLowerCase().includes(busqueda) ||
      libro.image?.toLowerCase().includes(busqueda)
    );
  });
}


filtrarPorTitulo() {
    if (this.filtroTitulo) {
        this.filteredLibros = this.libros.filter((libro: Libro) => libro.titulo?.toLowerCase().includes(this.filtroTitulo.toLowerCase()));
        this.filteredLibros = this.libros.filter((libro: Libro) => libro.autor);
    } else {
        this.filteredLibros = this.libros.filter((libro: Libro) => libro.dewey);
    }   if (this.buscarLibros) {
      this.buscarLibros();
    }
}

mostrarLibrosPorTituloYEditorial(libros: Libro[], buscarLibros: boolean = true) {
  const librosMostrados: { [titulo: string]: Libro } = {};

  libros.forEach((libro) => {
    const tituloEditorial = `${libro.titulo}-${libro.editorial}-${libro.image}`;
    if (!librosMostrados[tituloEditorial]) {
      librosMostrados[tituloEditorial] = libro;
    }
  });

  this.filteredLibros = Object.values(librosMostrados);
  if (buscarLibros) {
    this.buscarLibros();
  }
}

buscarLibros() {
  const librosMostrados: LibrosAgrupados = {};
  this.filteredLibros = this.libros.filter((libro: Libro) => {
      const tituloEditorial = libro.titulo + libro.editorial + libro.image;
      if (librosMostrados[tituloEditorial]) {
          return false;
      }
      librosMostrados[tituloEditorial] = true;
      const busqueda = this.filtroTitulo.toLowerCase().trim();
      return (
          libro.titulo?.toLowerCase().includes(busqueda)  ||
          libro.editorial?.toLowerCase().includes(busqueda) ||
          libro.referencias?.toLowerCase().includes(busqueda) ||
          libro.nombre_autor?.toLowerCase().includes(busqueda)
      );
  });
}


reemplazarLugares(selectedLibro: { 
  lugares: string, 
  paises: string, 
  autor: number, 
  editor: number, 
  lugar: number, 
  nombre_autor: string, 
  editorial: string,
  pais: number,
  fecha_edicion: string,
  image: string,
  idioma: number,
  contenido: string,
  referencias: string,
  dewey: string,
  idiomas: string,
  paginas: string,
  titulo: string,
  edicion: string,
  sn: string,
  sa: string,
  sl: string,
  unidades: number
  tipos: string | undefined}, paises: string) {
  
  const sn: string = 's.n';
  const sl: string  = 's.l';
  const sa: string  = 's.a';
  const autor: string = '';
  
  if (selectedLibro.lugares === '_NINGUNO') {
    selectedLibro.lugares = selectedLibro.paises || sl;
  }
  
  if (selectedLibro.editorial === '_NINGUNO') {
    selectedLibro.editorial = sn;
  }
  
  if (selectedLibro.fecha_edicion === '_NINGUNO') {
    selectedLibro.fecha_edicion = sa;
  }

  if (selectedLibro.nombre_autor === '_NINGUNO'){
    selectedLibro.nombre_autor = autor;
  }

  
  
  return selectedLibro;
} 

verMas(libro: Libro): void {
  const filteredLibros = this.libros.filter((l: { titulo: string; editorial: string; edicion: string; image: string;}) => l.titulo === libro.titulo && l.editorial === libro.editorial &&(l.edicion === libro.edicion || l.image === libro.image));

const tituloEditorial = `${libro.titulo}-${libro.editorial}`;

const librosContados = this.contarLibrosPorTituloYEditorial(filteredLibros);

libro.unidades = librosContados[`${tituloEditorial}-${libro.edicion}`] || librosContados[`${tituloEditorial}-${libro.image}`];

  this.selectedLibro = libro;
  const temaMateria = this.selectedLibro?.tipos;
  let abreviatura = "";
  const dewey = this.selectedLibro?.dewey;
  this.selectedLibro.dewey = abreviatura + dewey;

  if (temaMateria?.includes("Literatura Chilena") || temaMateria?.includes("Novelas Chilenas") || temaMateria?.includes("Cuentos Chilenos") || temaMateria?.includes("Poesías Chilenas") || temaMateria?.includes("Teatro Chileno") || temaMateria?.includes("Ensayos Chilenos") || temaMateria?.includes("Cartas Chilenas") || temaMateria?.includes("Sátiras Chilenas") || temaMateria?.includes("Humorismo Chileno") || temaMateria?.includes("Misceláneas Chilenas")) {
    abreviatura = "CH ";
  } else if (temaMateria?.includes("Literatura Peruana") || temaMateria?.includes("Novelas Peruana") || temaMateria?.includes("Cuentos Peruanos") || temaMateria?.includes("Poesías Peruanas") || temaMateria?.includes("Teatro Peruano") || temaMateria?.includes("Ensayos Peruanos") || temaMateria?.includes("Cartas Peruanos") || temaMateria?.includes("Sátiras Peruanas") || temaMateria?.includes("Humorismo Peruano") || temaMateria?.includes("Misceláneas Peruanas")) {
    abreviatura = "PE ";
  } else if (temaMateria?.includes("Literatura Argentina") || temaMateria?.includes("Novelas Argentinas") || temaMateria?.includes("Cuentos Argentinos") || temaMateria?.includes("Poesías Argentinas") || temaMateria?.includes("Teatro Argentino") || temaMateria?.includes("Ensayos Argentinos") || temaMateria?.includes("Cartas Argentinas") || temaMateria?.includes("Sátiras Argentinas") || temaMateria?.includes("Humorismo Argentino") || temaMateria?.includes("Misceláneas Argentinas")) {
    abreviatura = "A ";
  } else if (temaMateria?.includes("Literatura Cubana") || temaMateria?.includes("Novelas Cubanas") || temaMateria?.includes("Cuentos Cubanos") || temaMateria?.includes("Poesías Cubanas") || temaMateria?.includes("Teatro Cubano") || temaMateria?.includes("Ensayos Cubanos") || temaMateria?.includes("Cartas Cubanas") || temaMateria?.includes("Sátiras Cubanas") || temaMateria?.includes("Humorismo Cubano") || temaMateria?.includes("Misceláneas Cubanas")) {
    abreviatura = "CU ";
  } else if (temaMateria?.includes("Literatura Colombiana") || temaMateria?.includes("Novelas Colombianas") || temaMateria?.includes("Cuentos Colombianos") || temaMateria?.includes("Poesías Colombianas") || temaMateria?.includes("Teatro Colombiano") || temaMateria?.includes("Ensayos Colombianos") || temaMateria?.includes("Cartas Colombianas") || temaMateria?.includes("Sátiras Colombianas") || temaMateria?.includes("Humorismo Colombiano") || temaMateria?.includes("Misceláneas Colombianas")) {
    abreviatura = "CO ";
  } else if (temaMateria?.includes("Literatura Ecuatoriana") || temaMateria?.includes("Novelas Ecuatorianas") || temaMateria?.includes("Cuentos Ecuatorianos") || temaMateria?.includes("Poesías Ecuatorianas") || temaMateria?.includes("Teatro Ecuatorianos") || temaMateria?.includes("Ensayos Ecuatorianos") || temaMateria?.includes("Cartas Ecuatorianas") || temaMateria?.includes("Sátiras Ecuatorianas") || temaMateria?.includes("Humorismo Ecuatoriano") || temaMateria?.includes("Misceláneas Ecuatorianas")) {
    abreviatura = "E ";
  } else if (temaMateria?.includes("Literatura Uruguaya") || temaMateria?.includes("Novelas Uruguayas") || temaMateria?.includes("Cuentos Uruguayos") || temaMateria?.includes("Poesías Uruguayas") || temaMateria?.includes("Teatro Uruguayo") || temaMateria?.includes("Ensayos Uruguayos") || temaMateria?.includes("Cartas Uruguayas") || temaMateria?.includes("Sátiras Uruguayas") || temaMateria?.includes("Humorismo Uruguayo") || temaMateria?.includes("Misceláneas Uruguayas")) {
    abreviatura = "U ";
  } else if (temaMateria?.includes("Literatura Venezolana") || temaMateria?.includes("Novelas Venezolanas") || temaMateria?.includes("Cuentos Venezolanos") || temaMateria?.includes("Poesías Venezolanas") || temaMateria?.includes("Teatro Venezolano") || temaMateria?.includes("Ensayos Venezolanos") || temaMateria?.includes("Cartas Venezolanas") || temaMateria?.includes("Sátiras Venezolanas") || temaMateria?.includes("Humorismo Venezolano") || temaMateria?.includes("Misceláneas Venezolanas")) {
    abreviatura = "V ";
  } else if (temaMateria?.includes("Literatura Mexicana") || temaMateria?.includes("Novelas Mexicanas") || temaMateria?.includes("Cuentos Mexicanos") || temaMateria?.includes("Poesías Mexicanas") || temaMateria?.includes("Teatro Mexicano") || temaMateria?.includes("Ensayos Mexicanos") || temaMateria?.includes("Cartas Mexicanas") || temaMateria?.includes("Sátiras Mexicanas") || temaMateria?.includes("Humorismo Mexicano") || temaMateria?.includes("Misceláneas Mexicanas")) {
    abreviatura = "M ";
  } else if (temaMateria?.includes("Literatira Centroamericana") || temaMateria?.includes("Novelas Centroamericanas") || temaMateria?.includes("Cuentos Centoamericanos") || temaMateria?.includes("Poesías Centroamericanas") || temaMateria?.includes("Teatro Centroamericano") || temaMateria?.includes("Ensayos Centroamericanos") || temaMateria?.includes("Cartas Centroamericanas") || temaMateria?.includes("Sátiras Centroamericanas") || temaMateria?.includes("Humorismo Centroamericano") || temaMateria?.includes("Misceláneas Centroamericanas")) {
    abreviatura = "CE ";
  } else if (temaMateria?.includes("Literatira Hispanoamericana") || temaMateria?.includes("Novelas Hispanoamericanas") || temaMateria?.includes("Literatura Latinoamericana") || temaMateria?.includes("Novelas Latinoamericanas") || temaMateria?.includes("Cuentos Hispanos") || temaMateria?.includes("Cuentos Latinoamericanos") || temaMateria?.includes("Poesías Hispanoamericanas") || temaMateria?.includes("Teatro Hispanoamericano") || temaMateria?.includes("Ensayos Hispanoamericanos") || temaMateria?.includes("Cartas Hispanoamericanas") || temaMateria?.includes("Sátiras Hispanoamericanas") || temaMateria?.includes("Humorismo Hispanoamericano") || temaMateria?.includes("Misceláneas Hispanoamericanas") || temaMateria?.includes("Poesías Latinoamericanas") || temaMateria?.includes("Teatro Latinoamericano") || temaMateria?.includes("Ensayos Latinoamericanos") || temaMateria?.includes("Cartas Latinoamericanas") || temaMateria?.includes("Sátiras Latinoamericanas") || temaMateria?.includes("Humorismo Latinoamericano") || temaMateria?.includes("Misceláneas Latinoamericanas")) {
    abreviatura = "H ";
  } else if (temaMateria?.includes("Literatura Guatemalteca") || temaMateria?.includes("Novelas Guatemaltecas") || temaMateria?.includes("Cuentos Guatemaltecos") || temaMateria?.includes("Poesías Guatemaltecas") || temaMateria?.includes("Teatro Guatemalteco") || temaMateria?.includes("Ensayos Guatemaltecos") || temaMateria?.includes("Cartas Guatemaltecas") || temaMateria?.includes("Sátiras Guatemaltecas") || temaMateria?.includes("Humorismo Guatemalteco") || temaMateria?.includes("Misceláneas Guatemaltecas")) {
    abreviatura = "G ";
  } else if (temaMateria?.includes("Literatura Panameña") || temaMateria?.includes("Novelas Panameñas") || temaMateria?.includes("Cuentos Panameños") || temaMateria?.includes("Poesías Panameñas") || temaMateria?.includes("Teatro Panameño") || temaMateria?.includes("Ensayos Panameños") || temaMateria?.includes("Cartas Panameñas") || temaMateria?.includes("Sátiras Panameñas") || temaMateria?.includes("Humorismo Panameño") || temaMateria?.includes("Misceláneas Panameñas")) {
    abreviatura = "P ";
  } else if (temaMateria?.includes("Literatura Haitiana") || temaMateria?.includes("Novelas Haitianas") || temaMateria?.includes("Cuentos Haitianos") || temaMateria?.includes("Poesías Haitianas") || temaMateria?.includes("Teatro Haitiano") || temaMateria?.includes("Ensayos Haitianos") || temaMateria?.includes("Cartas Haitianas") || temaMateria?.includes("Sátiras Haitianas") || temaMateria?.includes("Humorismo Haitiano") || temaMateria?.includes("Misceláneas Haitianas")) {
    abreviatura = "H ";
  }

  if (this.selectedLibro?.lugares === '_NINGUNO' || this.selectedLibro?.editorial === '_NINGUNO' || this.selectedLibro?.fecha_edicion === '_NINGUNO' || this.selectedLibro?.nombre_autor === '_NINGUNO') {
    this.selectedLibro = this.reemplazarLugares({ 
      lugares: this.selectedLibro.lugares, 
      paises: this.selectedLibro.paises, 
      autor: this.selectedLibro.autor, 
      editor: this.selectedLibro.editor, 
      lugar: this.selectedLibro.lugar, 
      nombre_autor: this.selectedLibro.nombre_autor || '', 
      editorial: this.selectedLibro.editorial,
      pais: this.selectedLibro.pais,
      fecha_edicion: this.selectedLibro.fecha_edicion,
      image: this.selectedLibro.image,
      idioma: this.selectedLibro.idioma,
      contenido: this.selectedLibro.contenido,
      referencias: this.selectedLibro.referencias,
      dewey: this.selectedLibro.dewey,
      paginas: this.selectedLibro.paginas,
      idiomas: this.selectedLibro.idiomas,
      titulo: this.selectedLibro.titulo,
      edicion: this.selectedLibro.edicion,
      tipos: this.selectedLibro.tipos,
      sn: this.selectedLibro.sn || 's.n',
      sl: this.selectedLibro.sl || 's.l',
      sa: this.selectedLibro.sa || 's.a',
      unidades: this.selectedLibro.unidades
    }, 
    this.selectedLibro?.paises);
  }
}

contarLibrosPorTituloYEditorial(libros: Libro[]): { [tituloEditorial: string]: number } {
  const librosContados: { [tituloEditorial: string]: number } = {};

  libros.forEach((libro) => {

    const librosConMismoTituloYEditorial = libros.filter((otroLibro) => {
      return (
        libro.titulo === otroLibro.titulo &&
        libro.editorial === otroLibro.editorial &&
        libro.edicion !== otroLibro.edicion &&
        libro.image !== otroLibro.image
      );
    });

    const librosConMismoTituloYEdicion = libros.filter((otroLibro) => {
      return (
        libro.titulo === otroLibro.titulo &&
        libro.editorial === otroLibro.editorial &&
        libro.edicion !== otroLibro.edicion &&
        libro.image === otroLibro.image
      );
    });

    const librosConTodoIgual = libros.filter((otroLibro) => {
      return (
        libro.titulo === otroLibro.titulo &&
        libro.editorial === otroLibro.editorial &&
        libro.edicion === otroLibro.edicion &&
        libro.image === otroLibro.image
      );
    });

    if (librosConMismoTituloYEditorial.length > 0) {
      const tituloEditorialImagen = `${libro.titulo}-${libro.editorial}-${libro.image}`;
      if (!librosContados[tituloEditorialImagen]) {
        librosContados[tituloEditorialImagen] = librosConMismoTituloYEditorial.length;
      }
    } else if (librosConMismoTituloYEdicion.length > 0) {
      const tituloEditorialEdicion = `${libro.titulo}-${libro.editorial}-${libro.edicion}`;
      if (!librosContados[tituloEditorialEdicion]) {
        librosContados[tituloEditorialEdicion] = librosConMismoTituloYEdicion.length;
      }
    } else if (librosConTodoIgual.length > 0) {
      const tituloEditorialTodo = `${libro.titulo}-${libro.editorial}-${libro.edicion}`;
      if (!librosContados[tituloEditorialTodo]) {
        librosContados[tituloEditorialTodo] = librosConTodoIgual.length;
      }
    }
  });

  return librosContados;
}


}

