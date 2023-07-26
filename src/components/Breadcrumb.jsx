import useLastWordFromURL from "../hooks/useLastWordFromURL"

// CSS
import style from "./Breadcrumb.module.css"


function Breadcrumb() {

  const lastWord = useLastWordFromURL();

  return (
    <div className={style.breadcrumb}>
      {lastWord && 
        <>
          <a href="/">Página inicial</a>
          &gt;
          <a href={`${window.location.href}`} className={style.active}>{lastWord}</a>
        </>
      }
    </div>
  )
}

export default Breadcrumb