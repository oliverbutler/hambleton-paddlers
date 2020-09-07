import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Hambleton Paddlers</strong> site by <a href="https://github.com/oliverbutler">Oliver Butler</a>
        </p>
        <p>© Hambleton Paddlers {new Date().getFullYear()}.</p>
      </div>
    </footer>
  )
}

export default Footer
