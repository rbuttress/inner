import React, { Suspense, useDeferredValue, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, PresentationControls } from '@react-three/drei';
import { FaDownload, FaGithub, FaPlay } from 'react-icons/fa'; // Import the download icon from react-icons

import tunnel from 'tunnel-rat';

const status = tunnel();

const MODELS = {
  FULL: {
    lable: 'FULL',
    title: 'CNC Conveyorbelt Tangential Knife',
    accessibility: 'None',
    description: 'Full is a small workshop based around a prototype computer controlled fabric cutter. To learn more about the equipment visit the Repository below or download the Assembly Guide. This page hosts an open-source glossary of accessible and inclusive garment patterns developed by FULL. Research support comes from the Center For Craft, MSAC, and the Processing Foundation. Patterns are ungraded and generally untested, and available as a starting point or for adaptation. Accessibility features will be added upon request. Collaboration, pattern drafting, and degrowth-related inquiries can be directed to rosebuttress@gmail.com or @rosebuttress on IG.',
    glbFileLocation: '/models/full.glb',
    pdfFileLocation: 'https://github.com/rbuttress/full/blob/main/Assembly%20Guide.pdf',
  },
  Narrow: {
    lable: 'Narrow Thong',
    title: 'Narrow Liner Thongs',
    size: 'S',
    type: 'Thong',
    color: 'Black',
    fabric: 'Mesh, Cotton',
    configuration: 'Narrow Liner',
    accessibility: 'None',
    description: 'Wicking cotton jersey liner 5cm wide. Black mesh, fold over elastic',
    glbFileLocation: '/models/narrow.glb',
    pdfFileLocation: '/documents/thong-null-narrow-small.pdf',
  },
  Wide: {
    lable: 'Wide Thong',
    title: 'Wide Liner Thong',
    size: 'S',
    type: 'Thong',
    color: 'Black',
    fabric: 'Mesh, Cotton',
    configuration: 'Wide Liner',
    accessibility: 'None',
    description: 'Wicking cotton jersey liner 9cm wide for wider coverage and lower compression hold. Black mesh, fold over elastic',
    glbFileLocation: '/models/wide.glb',
    pdfFileLocation: '/documents/thong-null-wide-small.pdf',
  },
  Tucking: {
    lable: 'Tucking Thong',
    title: 'Tucking Thong',
    size: 'S',
    type: 'Thong',
    color: 'Black',
    fabric: 'Mesh, Cotton',
    configuration: 'Wide Liner',
    accessibility: 'None',
    description: 'Tucking 1 way stretch cotton layer for compression. Black mesh, fold over elastic',
    glbFileLocation: '/models/tucking.glb',
    pdfFileLocation: '/documents/thong-null-tucking-small.pdf',
  },
  Snaps: {
    lable: 'Narrow Detachable Thong',
    title: 'Narrow Liner Thong with Detachable Side',
    size: 'S',
    type: 'Thong',
    color: 'Black',
    fabric: 'Mesh, Cotton',
    configuration: 'Narrow Liner',
    accessibility: 'Detatchable Side',
    description: 'Wicking cotton jersey liner 5cm wide. Black mesh, fold over elastic. Detachable sides for ease of wear.',
    glbFileLocation: '/models/snaps.glb',
    pdfFileLocation: '/documents/thong-snap-narrow-small.pdf',
  },
  Short: {
    lable: 'Narrow Short',
    title: 'Narrow Liner Short',
    size: 'S',
    type: 'Short',
    color: 'Black',
    fabric: 'Mesh, Cotton',
    configuration: 'Narrow Liner',
    accessibility: 'None',
    description: 'A short with a 6 cm wide liner.',
    glbFileLocation: '/models/short.glb',
    pdfFileLocation: '/documents/short-null-narrow-small.pdf',
  },
  Compression: {
    lable: 'Sock Short',
    title: 'Narrow Liner Sock Short',
    size: 'S',
    type: 'Short',
    color: 'Black',
    fabric: 'Mesh, Cotton',
    configuration: 'Narrow Liner',
    accessibility: 'Compression Sleeve',
    description: 'A short with a 6 cm wide liner and left amputee sock for compression and comfort. This pattern will be updated to include a unique grading for both size and also desired amputee sock length.',
    glbFileLocation: '/models/compression.glb',
    pdfFileLocation: '/documents/short-sock-narrow-small.pdf',
  },

  // Add more models with title, description, and file locations
};

export default function App() {

  const navRef = useRef( null );

  const handleModelChange = ( modelName ) => {
    setSelectedModel( modelName );
    // Scroll to center the selected menu item
    const nav = navRef.current;
    const selectedMenuItem = nav.querySelector( `button[data-model="${modelName}"]` );
    if ( selectedMenuItem ) {
      const navWidth = nav.offsetWidth;
      const menuItemWidth = selectedMenuItem.offsetWidth;
      const menuItemLeft = selectedMenuItem.offsetLeft;
      const scrollLeft = menuItemLeft - ( navWidth - menuItemWidth ) / 2;
      nav.scrollTo( { left: scrollLeft, behavior: 'smooth' } );
    }
  };

  const [selectedModel, setSelectedModel] = React.useState( 'FULL' );

  return (
    <div style={ { position: 'relative', width: '100vw', height: '100vh' } }>


      <header className="p-4 md:p-20 absolute top-12 md:top-0 left-0 z-10" style={ { pointerEvents: 'none' } }>
        <h1 className="text-2xl font-bold relative">
          { MODELS[selectedModel].title }
        </h1>
        { MODELS[selectedModel].size && <span className="text-md">Size: <b>{ MODELS[selectedModel].size }</b></span> }
        { MODELS[selectedModel].color && <span className="text-md"> Color: <b>{ MODELS[selectedModel].color }</b></span> }
        { MODELS[selectedModel].fabric && <span className="text-md"> Fabric: <b>{ MODELS[selectedModel].fabric }</b></span> }
        <p>-</p>
        <p className="text-sm">{ MODELS[selectedModel].description }</p>
        <status.Out />
      </header>





      <nav className="fixed top-0 left-0 w-full bg-gray-100 overflow-x-auto z-10" ref={ navRef }>
        <div className="flex px-4 py-2" style={ { whiteSpace: 'nowrap' } }>
          { Object.keys( MODELS ).map( ( modelName ) => (
            <button
              key={ modelName }
              onClick={ () => handleModelChange( modelName ) }
              className={ `flex px-4 py-2 font-semibold text-gray-600 ${selectedModel === modelName ? 'bg-gray-300' : ''}` }
              data-model={ modelName }
            >
              { MODELS[modelName].lable }
            </button>
          ) ) }
        </div>
      </nav>


      <div className="fixed bottom-0 left-0 w-full z-20 flex justify-center pb-4">
        <div className="flex space-x-4">
          { selectedModel === 'FULL' ? (
            <>
              <button
                onClick={ () => window.location.href = "http://github.com/rbuttress/full" }
                className="px-4 py-4 font-semibold text-grey-500 bg-white-500 rounded hover:text-green-600 focus:outline-none focus:ring focus:ring-green-300"
              >
                <div className='flex'><FaGithub className="mr-2" /> Repository </div>
              </button>
              <button
                onClick={ () => window.location.href = "https://www.youtube.com/watch?v=8nrIL4Qvl0I&ab_channel=RoseButtress" }
                className="px-4 py-4 font-semibold text-grey-500 bg-white-500 rounded hover:text-green-600 focus:outline-none focus:ring focus:ring-green-300"
              >
                <div className='flex'><FaPlay className="mr-2" /> Video </div>
              </button>
            </>
          ) : (
            <button
              onClick={ () => window.location.href = MODELS[selectedModel].glbFileLocation }
              className="px-4 py-4 font-semibold text-grey-500 bg-white-500 rounded hover:text-green-600 focus:outline-none focus:ring focus:ring-green-300"
            >
              <div className='flex'><FaDownload className="mr-2" /> .GLB </div>
            </button>
          ) }
          <button
            onClick={ () => window.location.href = MODELS[selectedModel].pdfFileLocation }
            className="px-4 py-4 font-semibold text-grey-500 bg-white-500 rounded hover:text-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            <div className='flex'><FaDownload className="mr-2" /> .PDF </div>
          </button>
        </div>
      </div>

      <Canvas camera={ { position: [0, -10, 50], fov: 50, look: [0, -300, 0] } }>
        <hemisphereLight color="white" groundColor="white" intensity={ 2 } castShadow />
        <spotLight position={ [50, 50, 10] } angle={ 0.15 } penumbra={ 1 } castShadow />

        <group position={ [0, -10, 0] }>
          <Suspense fallback={ <status.In>Loading ...</status.In> }>
            <PresentationControls
              global
              config={ { mass: 2, tension: 50 } }
              snap={ { mass: 2, tension: 50 } }
              rotation={ [0, 0, 0] }
              polar={ [-Math.PI / 3, Math.PI / 3] }
              azimuth={ [-Math.PI / 1.4, Math.PI / 2] }>
              { selectedModel === 'FULL' ? (
                <>
                  <Model receiveShadow scale={ 20 } position={ [-12, 3, -3] } url="/models/e.glb" />
                  <Model receiveShadow scale={ 20 } position={ [-12, 3, -3] } url="/models/y.glb" />
                  <Model receiveShadow scale={ 20 } position={ [-12, 3, -3] } url="/models/x.glb" />
                </>
              ) : (
                <Model receiveShadow scale={ 50 } position={ [0, -40, 0] } url={ MODELS[selectedModel].glbFileLocation } />
              ) }</PresentationControls>

          </Suspense>
          <ContactShadows scale={ 90 } blur={ 2 } far={ 80 } />
        </group>

        <OrbitControls azimuth={ [Math.PI / 2, Math.PI / 2] } enablePan={ false } />
      </Canvas>
    </div >
  );
}

function Model( { url, ...props } ) {
  const deferred = useDeferredValue( url );
  const { scene } = useGLTF( deferred );
  const modelRef = useRef();

  // Ensure all materials cast and receive shadows
  if ( modelRef.current ) {
    modelRef.current.traverse( ( child ) => {
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    } );
  }
  return <primitive object={ scene } { ...props } />;


}
