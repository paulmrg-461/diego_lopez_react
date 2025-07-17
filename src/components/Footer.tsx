import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DL</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Escuela de Conducción Diego López</h3>
                <p className="text-gray-400 text-sm">Formando conductores responsables</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Con más de 15 años de experiencia, somos la escuela de conducción líder en Popayán. 
              Ofrecemos cursos para todas las categorías de licencia con instructores certificados 
              y vehículos en excelente estado.
            </p>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Calle 5 # 8-45</p>
                  <p className="text-sm text-gray-300">Popayán, Cauca, Colombia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <p className="text-sm text-gray-300">+57 (2) 824-5678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <p className="text-sm text-gray-300">info@diegolopez.com</p>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horarios</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Lunes - Viernes</p>
                  <p className="text-sm text-gray-400">7:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Sábados</p>
                  <p className="text-sm text-gray-400">8:00 AM - 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Domingos</p>
                  <p className="text-sm text-gray-400">Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Escuela de Conducción Diego López. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;