import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importer useParams
import './EditTeacher.css';

interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    emailPro: string;
    emailPerso: string;
    phoneNumber: string;
    address: string;
    archive: boolean;
}

const EditTeacher: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Utiliser 'id' au lieu de 'teacherId'
    const [teacher, setTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                if (id) {
                    console.log('ID de l\'enseignant:', id); // Afficher l'ID de l'enseignant
                    const response = await axios.get<Teacher>(`http://localhost:8080/teachers/${id}`);
                    setTeacher(response.data);
                }
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la récupération des données de l\'enseignant.');
            }
        };

        fetchTeacher();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (teacher) {
            const { name, value } = e.target;
            setTeacher(prevState => ({
                ...prevState!,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (teacher) {
            try {
                await axios.put<Teacher>(`http://localhost:8080/teachers/${teacher.id}`, teacher);
                alert('Enseignant modifié avec succès!');
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la modification de l\'enseignant.');
            }
        }
    };

    if (!teacher) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container">
            <h1>Modifier un Enseignant</h1>
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
                <button type="submit" className="submit-button">Modifier Enseignant</button>
            </form>
        </div>
    );
};

export default EditTeacher;
