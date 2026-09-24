/** Brand tokens live here — swap hexes to match Kinderpedia's exact palette. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink:'#0B2545', brand:{DEFAULT:'#0FB5A8',dark:'#0A8A80',soft:'#D8F5F2'}, sun:{DEFAULT:'#FFC53D',dark:'#E0A210'}, coral:{DEFAULT:'#FF6B5B',dark:'#D9483A'}, sky:'#E9F4FF', cloud:'#F7FAFC' },
    fontFamily: { display:['Fredoka','system-ui','sans-serif'], sans:['DM Sans','system-ui','sans-serif'] },
    keyframes: { pulseRing:{ '0%':{boxShadow:'0 0 0 0 rgba(255,197,61,.6)'}, '100%':{boxShadow:'0 0 0 18px rgba(255,197,61,0)'} }, float:{ '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-8px)'} } },
    animation: { ring:'pulseRing 1.6s infinite', float:'float 5s ease-in-out infinite' }
  } }
}
