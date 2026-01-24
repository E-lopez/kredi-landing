interface ConsentModalProps {
  content: Record<string, string>;
}

export const ConsentModal = ({ content }: ConsentModalProps) => {
  return(
    <div style={{overflowY: 'auto', maxHeight: '80vh', padding: '2rem'}}>
      <h1 className="heading-primary">Tratamiento de datos</h1>
      <div className="u-p-20">
        <p className="paragraph u-justify-text">
        {Object.keys(content).map((key, i) => {
          return (
            <span key={i}>
              - {content[key]}
              {i < Object.keys(content).length - 1 && <br />}
            </span>
          );
        })}
      </p>
      </div>
    </div>
  )
}