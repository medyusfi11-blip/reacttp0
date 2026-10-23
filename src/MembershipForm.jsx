function MembershipForm() {
  return (
    <div className="container">

      <h1>Membership Registration</h1>

      <form>

        <div className="form-group">
          <label>First Name *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Last Name *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Street Address *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Address Line 2</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>City *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>State *</label>

          <select required defaultValue="">
            <option value="">Choose a state</option>
            <option value="morocco">Morocco</option>
            <option value="tangier">Tangier</option>
            <option value="tetouan">Tetouan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Zip Code *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input type="tel" required />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" required />
        </div>

        <div className="form-group">
          <label>Choose your membership level *</label>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="membership"
                value="Bronze"
                required
              />
              Bronze
            </label>

            <label>
              <input
                type="radio"
                name="membership"
                value="Silver"
              />
              Silver
            </label>

            <label>
              <input
                type="radio"
                name="membership"
                value="Gold"
              />
              Gold
            </label>

            <label>
              <input
                type="radio"
                name="membership"
                value="Platinum"
              />
              Platinum
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" required />
            I accept the Terms and Conditions
          </label>
        </div>

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default MembershipForm;