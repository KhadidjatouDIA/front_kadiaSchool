import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css'; // Assurez-vous d'importer le CSS pour le style

interface Student {
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

const AddStudent: React.FC = () => {
    const [student, setStudent] = useState<Student>({
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
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post<Student>('http://localhost:8080/students', student);
            alert('Étudiant ajouté avec succès!');
            // Réinitialiser le formulaire ou rediriger si nécessaire
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'ajout de l\'étudiant.');
        }
    };

    return (
        <div className="container">
            <h1>Ajouter un Étudiant</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        value={student.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        value={student.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailPro">Email Pro</label>
                    <input
                        type="email"
                        name="emailPro"
                        value={student.emailPro}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailPerso">Email Perso</label>
                    <input
                        type="email"
                        name="emailPerso"
                        value={student.emailPerso}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Téléphone</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={student.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <input
                        type="text"
                        name="address"
                        value={student.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="archive">Archivé</label>
                    <select
                        name="archive"
                        value={student.archive ? 'true' : 'false'}
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
                        value={student.registrationNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Ajouter Étudiant</button>
            </form>
        </div>
    );
};

export default AddStudent;
