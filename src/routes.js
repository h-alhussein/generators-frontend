import React from 'react'


// images

const QrGenerator = React.lazy(() => import('./views/qrGenertor/qrGenerator'))
const Catboot = React.lazy(() => import('./views/catboot/catboot'))
const Weather = React.lazy(() => import('./views/weather/weather'))
const TextRepeater = React.lazy(() => import('./views/textRepeater/textRepeater'))
const Page404= React.lazy(()=> import("./views/pages/page404/Page404"))




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/qr-generator', name: 'QR-Generator', element: QrGenerator },
  { path: '/catboot', name: 'Catboot', element: Catboot },
  { path: '/weather', name: 'Weather', element: Weather },
  { path: '/text-repeater', name: 'Text-repeater', element: TextRepeater },


  { path: '*', name: '404', element: Page404 },


]

export default routes
