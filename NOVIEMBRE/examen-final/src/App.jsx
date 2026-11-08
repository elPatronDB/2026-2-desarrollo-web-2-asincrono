import { useState, useEffect } from 'react'

function App() {
  const [segundosTotales, setSegundosTotales] = useState(0)
  const [mostrarPuntos, setMostrarPuntos] = useState(true)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundosTotales((prev) => prev + 1)
      setMostrarPuntos((prev) => !prev)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  const minutos = String(Math.floor(segundosTotales / 60)).padStart(2, '0')
  const segundos = String(segundosTotales % 60).padStart(2, '0')

  const guardarLap = () => {
    const nuevaVuelta = {
      numero: laps.length + 1,
      tiempo: `${minutos}:${segundos}`,
    }

    setLaps([nuevaVuelta, ...laps])
    setSegundosTotales(0)
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '40px' }}>
      <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
        <span>{minutos}</span>
        <span style={{ visibility: mostrarPuntos ? 'visible' : 'hidden' }}>:</span>
        <span>{segundos}</span>
      </div>

      <button
        onClick={guardarLap}
        style={{
          padding: '10px 24px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        LAP
      </button>

      <div style={{ marginTop: '20px' }}>
        {laps.map((lap) => (
          <div key={lap.numero} style={{ fontSize: '18px', margin: '6px 0' }}>
            {lap.numero} &nbsp; {lap.tiempo}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
