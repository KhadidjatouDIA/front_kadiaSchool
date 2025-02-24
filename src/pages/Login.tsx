import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
      <div className="w-full flex justify-center items-center min-h-screen bg-layoutBgColor dark:bg-layoutBgDarkColor">
        <div className="flex flex-col justify-center items-center w-full md:w-1/3 p-10 border border-dividergray rounded-lg bg-white dark:bg-sideBarBgColorDark">
          <h3 className="mb-4 text-3xl font-bold text-center">Login</h3>
          <p className="mb-4 text-gray-600 text-center">
             Veuillez vous connecter à votre compte.
          </p>
          <div className="mb-3 w-full">
            <input
                type="email"
                className="input rounded-md p-3 w-full placeholder:text-gray-500"
                placeholder="Email"
            />
          </div>
          <div className="mb-1 w-full">
            <input
                type="password"
                className="input rounded-md p-3 w-full placeholder:text-gray-500"
                placeholder="Mot de passe"
            />
          </div>
          <div className="flex justify-between mb-5 w-full">
            <div className="flex items-center">
              <input
                  type="checkbox"
                  className="form-check-input"
                  id="formCheck"
              />
              <label htmlFor="formCheck" className="text-gray-600 ml-2">
                <small>Se souvenir de moi</small>
              </label>
            </div>
            <div className="forgot">
              <small>
                <a href="#" style={{ color: '#ff9927' }} className="hover:underline">
                  Mot de passe oublié ?
                </a>
              </small>
            </div>
          </div>
          <div className="mb-3 w-full">
            <button
                className="w-full"
                style={{ backgroundColor: '#ff9927', color: 'white', border: 'none', fontSize: '1.125rem', padding: '1rem', borderRadius: '0.375rem' }}
                onClick={handleLoginClick}
            >
              Se connecter
            </button>
          </div>

          <div className="text-center w-full">
            <small>
              Vous n'avez pas de compte ?
              <a href="#" style={{ color: '#d14b2f' }} className="hover:underline">
                S'inscrire
              </a>
            </small>
          </div>
        </div>
      </div>
  );
};

export default Login;
