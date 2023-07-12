import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = [
  'amber',
  'orange',
  'teal',
  'blue',
  'emerald',
  'red',
  'lightblue',
]

class App extends Component {
  state = {
    isTrue: true,
    latestList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isShow: false,
  }

  deleteWebsite = id => {
    const {latestList} = this.state
    const updatedList = latestList.filter(eachItem => eachItem.id !== id)
    const caseOf = updatedList.length === 0
    this.setState({latestList: updatedList, isTrue: !caseOf})
    console.log(caseOf)
  }

  enterWebsite = event => {
    this.setState({website: event.target.value})
  }

  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const firstLetter = website.slice(0, 1).toUpperCase()
    const color = colorList[Math.floor(Math.random() * 7)]
    const newValues = {
      id: uuidv4(),
      initial: firstLetter,
      website,
      username,
      password,
      colorClass: color,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
    }))
  }

  renderPasswords = filteredList => {
    const {isShow} = this.state
    return (
      <ul>
        {filteredList.map(eachWebsite => (
          <li key={eachWebsite.id} id={eachWebsite.id}>
            <div className={`initial ${eachWebsite.colorClass}`}>
              {eachWebsite.initial}
            </div>
            <div>
              <p className="initial-text">{eachWebsite.website}</p>
              <p>{eachWebsite.username}</p>
              {isShow ? (
                <p>{eachWebsite.password}</p>
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                  alt="stars"
                  className="stars"
                />
              )}
            </div>
            <div>
              <button
                type="button"
                className="delete-button"
                onClick={() => this.deleteWebsite(eachWebsite.id)}
                data-testid="delete"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                  className="delete-image"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderNoPasswords = () => (
    <div className="pw-display-container">
      <div className="no-passwords-img-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-img"
        />
        <p>No Passwords</p>
      </div>
    </div>
  )

  searchInputValue = event => {
    const {latestList} = this.state
    const caseOf = latestList.length === 0
    this.setState({searchInput: event.target.value, isTrue: !caseOf})
    console.log(caseOf)
  }

  onToggleCheckBox = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow,
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      searchInput,
      isShow,
    } = this.state

    let {isTrue} = this.state
    const filteredList = latestList.filter(eachWebsite =>
      eachWebsite.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (filteredList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    const countOfPasswords = filteredList.length

    const displayPasswordsSection = isTrue
      ? this.renderPasswords(filteredList)
      : this.renderNoPasswords()

    return (
      <div className="app-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="inputs-container">
          <div className="images-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
              alt="password manager"
              className="pwm-image"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
              alt="password manager"
              className="pwm-image2"
            />
          </div>
          <form className="input-details-container" onSubmit={this.addContent}>
            <h1>Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="search-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                onChange={this.enterWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="search-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                onChange={this.enterUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="search-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                onChange={this.enterPassword}
                value={password}
              />
            </div>

            <div className="button-container">
              <button className="add-button" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
        {/*-----------------------------------------*/}
        <div className="pw-container">
          <div className="pws-top-container">
            <div className="count-text-cont">
              <h1 className="your-passwords">Your Passwords</h1>
              <p className="count">{countOfPasswords}</p>
            </div>
            <div className="search-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="input search-input"
                placeholder="Search"
                onChange={this.searchInputValue}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="check-box-container">
            <div className="check-in-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                value={isShow}
                onClick={this.onToggleCheckBox}
              />
              <label htmlFor="checkbox">Show Passwords</label>
            </div>
          </div>
          <div>{displayPasswordsSection}</div>
        </div>
      </div>
    )
  }
}
export default App
