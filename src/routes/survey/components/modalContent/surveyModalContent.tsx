export const SurveyModalContent =  {
  duplicatedData: (messages: string[]) => (
    <div className="u-center-v" style={{height: '100vh'}}>
      <h1 className="heading-primary">¡Houston tenemos un problema!</h1>
      <div className="u-p-30 u-center-v">
        <p className="paragraph u-center-text">Algunos datos que ingresaste ya existen: <br/> {messages.map((msg, index) => <strong key={index+msg}>{msg.trim()}<br/></strong>)} Inténtalo nuevamente.<br/> Contáctanos si el problema persiste.</p>
      </div>
    </div>
  )
}