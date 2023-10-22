import logoEmail from "../assets/verifyEmail.png";

export default function SendEmail({ email = "youremail@gmail.com" }) {

  return (
    <div className="w-full flex items-center justify-center h-screen bg-slate-200">
      <div className="max-w-sm flex flex-col justify-center items-center rounded-md p-4 border border-gray-500 bg-white m-4">
        <img src={logoEmail} alt="Email Logo" className="w-[200px]" />
        <h2 className="font-bold text-xl">Verifica tu correo electronico</h2>
        <p className="inline">
          Ya te enviamos un link al email: <b>{email}</b> para poder verificar
          la existencia del correo. Para entrar al gmail podes hacer
          <span>
            {" "}
            <a className="text-blue-800" href="https://mail.google.com/mail">
              click aca
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
