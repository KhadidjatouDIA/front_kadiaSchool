import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importer useParams
import './EditStudent.css';

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

const EditStudent: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Utiliser 'id' au lieu de 'studentId'
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                if (id) {
                    console.log('ID de l\'étudiant:', id); // Utiliser console.log au lieu de Console.log
                    const response = await axios.get<Student>(`http://localhost:8080/students/${id}`);
                    setStudent(response.data);
                }

            } catch (error) {
                console.error(error);
                alert('Erreur lors de la récupération des données de l\'étudiant.');
            }
        };

        fetchStudent();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (student) {
            const { name, value } = e.target;
            setStudent(prevState => ({
                ...prevState!,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (student) {
            try {
                await axios.put<Student>(`http://localhost:8080/students/${student.id}`, student);
                alert('Étudiant modifié avec succès!');
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la modification de l\'étudiant.');
            }
        }
    };

    if (!student) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container">
            <h1>Modifier un Étudiant</h1>
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
                <button type="submit" className="submit-button">Modifier Étudiant</button>
            </form>
        </div>
    );
};

export default EditStudent;
