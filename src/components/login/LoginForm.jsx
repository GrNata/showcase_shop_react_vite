import {useState} from "react";

export const LoginForm = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();     // предотвращаем перезагрузку страницы
        onLogin({email, password});     // передаём данные родителю (если надо)
    }

    return (
        <div className='container mt-5'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email: </label>
                    <input
                        type='email'
                        className='form-controle'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>Password: </label>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-secondary'>Login</button>
            </form>
        </div>
    )
}