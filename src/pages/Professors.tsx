import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import './Teachers.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const Teachers: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Teacher[]>('http://localhost:8080/teachers'); // Changer l'URL pour les enseignants
            setTeachers(response.data);
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleEdit = (id: number) => {
        navigate(`/teachers/details/${id}`); // Changer la route pour l'édition des enseignants
    }

    const handleDelete = async (id: number) => {
        console.log(`Tentative de suppression de l'enseignant avec l'ID: ${id}`);
        if (window.confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
            try {
                const response = await axios.delete(`http://localhost:8080/teachers/${id}`);
                console.log('Response:', response); // Log the response to check for success
                setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== id));
                alert('Enseignant supprimé avec succès!');
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression: ' + (error.response ? error.response.data : error.message));
            }
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.firstName.toLowerCase().includes(search.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(search.toLowerCase()) ||
        teacher.emailPro.toLowerCase().includes(search.toLowerCase()) ||
        teacher.emailPerso.toLowerCase().includes(search.toLowerCase()) ||
        teacher.phoneNumber.includes(search) ||
        teacher.address.toLowerCase().includes(search)
    );

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="container">
            <h1>Liste des Enseignants</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Rechercher un enseignant..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Link to="/teachers/addteacher"> {/* Changer la route pour ajouter un enseignant */}
                    <button className="add-button">Nouveau</button>
                </Link>
            </div>
            <table className="teachers-table"> {/* Changer le nom de la classe si nécessaire */}
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email Pro</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Archivé</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.emailPro}</td>
                            <td>{teacher.phoneNumber}</td>
                            <td>{teacher.address}</td>
                            <td>{teacher.archive ? 'Oui' : 'Non'}</td>
                            <td className="actions">
                                <button className="icon-button edit" onClick={() => handleEdit(teacher.id)}>
                                    <FaEdit/>
                                </button>
                                <button className="icon-button delete" onClick={() => handleDelete(teacher.id)}>
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8} className="no-results">Aucun enseignant trouvé</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Teachers;
