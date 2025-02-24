import React, { useState } from 'react';
import axios from 'axios';
import './AddTeacher.css'; // Assurez-vous d'importer le CSS pour le style

interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    emailPro: string;
    emailPerso: string;
    phoneNumber: string;
    address: string;
    archive: boolean;
    registrationNo: string;
}

const AddTeacher: React.FC = () => {
    const [teacher, setTeacher] = useState<Teacher>({
        id: 0,
        firstName: '',
        lastName: '',
        emailPro: '',
        emailPerso: '',
        phoneNumber: '',
        address: '',
        archive: false,
        registrationNo: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTeacher(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post<Teacher>('http://localhost:8080/teachers', teacher);
            alert('Enseignant ajouté avec succès!');
            // Réinitialiser le formulaire ou rediriger si nécessaire
            setTeacher({
                id: 0,
                firstName: '',
                lastName: '',
                emailPro: '',
                emailPerso: '',
                phoneNumber: '',
                address: '',
                archive: false,
                registrationNo: ''
            }); // Réinitialisation du formulaire
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'ajout de l\'enseignant.');
        }
    };

    return (
        <div className="container">
            <h1>Ajouter un Enseignant</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        value={teacher.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        value={teacher.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailPro">Email Pro</label>
                    <input
                        type="email"
                        name="emailPro"
                        value={teacher.emailPro}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailPerso">Email Perso</label>
                    <input
                        type="email"
                        name="emailPerso"
                        value={teacher.emailPerso}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Téléphone</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={teacher.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <input
                        type="text"
                        name="address"
                        value={teacher.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="archive">Archivé</label>
                    <select
                        name="archive"
                        value={teacher.archive ? 'true' : 'false'}
                        onChange={handleChange}
                    >
                        <option value="false">Non</option>
                        <option value="true">Oui</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="registrationNo">Numéro d'enregistrement</label>
                    <input
                        type="text"
                        name="registrationNo"
                        value={teacher.registrationNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Ajouter Enseignant</button>
            </form>
        </div>
    );
};

export default AddTeacher;
