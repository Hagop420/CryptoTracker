import { useState, useEffect } from 'react'

export function LightAndDarkMode() {
  const [lightSettings, setLightsSettings] = useState(
    localStorage.getItem('theme') ?? 'lofi',
  )

  // browser theme
  function handleToggle(e: { target: { checked: any } }) {
    if (e.target.checked) {
      setLightsSettings('night')
    } else {
      setLightsSettings('lofi') //light
    }
  }
  // browser theme
  useEffect(() => {
    localStorage.setItem('theme', lightSettings)
    const localTheme = localStorage.getItem('theme') ?? 'lofi'
    document.querySelector('html')?.setAttribute('data-theme', localTheme)
  }, [lightSettings])

  return (
    // Light and dark mode daisyUI theme
    <div className="flex container m-3 justify-start">
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={lightSettings === 'lofi' ? false : true}
        />

        {/* sun icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <defs>
            <mask id="circle-mask-1">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle r="9" fill="black" cx="100%" cy="0%" />
            </mask>
          </defs>
          <circle
            cx="12"
            cy="12"
            fill="#E5D9CC"
            mask="url(#circle-mask-1)"
            r={5}
            //   style={{ r: '5px' }}
          />
          <g stroke="currentColor" style={{ opacity: 1 }}>
            <line x1={12} y1={1} x2={12} y2={3} />
            <line x1={12} y1={21} x2={12} y2={23} />
            <line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
            <line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
            <line x1={1} y1={12} x2={3} y2={12} />
            <line x1={21} y1={12} x2={23} y2={12} />
            <line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
            <line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
          </g>
        </svg>

        {/* moon icon */}
      </label>
    </div>
    //   dausyUI theme end
  )
}
