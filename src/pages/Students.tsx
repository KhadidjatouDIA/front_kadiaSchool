import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import './Students.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const Students: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Student[]>('http://localhost:8080/students');
            setStudents(response.data);
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
        navigate(`/students/details/${id}`);
    }

    const handleDelete = async (id: number) => {
        console.log(`Tentative de suppression de l'étudiant avec l'ID: ${id}`);
        if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
            try {
                const response = await axios.delete(`http://localhost:8080/students/${id}`);
                console.log('Response:', response); // Log the response to check for success
                setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
                alert('Étudiant supprimé avec succès!');
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression: ' + (error.response ? error.response.data : error.message));
            }
        }
    };



    const filteredStudents = students.filter(student =>
        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.lastName.toLowerCase().includes(search.toLowerCase()) ||
        student.emailPro.toLowerCase().includes(search.toLowerCase()) ||
        student.emailPerso.toLowerCase().includes(search.toLowerCase()) ||
        student.phoneNumber.includes(search) ||
        student.address.toLowerCase().includes(search) ||
        student.registrationNo.includes(search)
    );

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="container">
            <h1>Liste des Étudiants</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Rechercher un étudiant..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Link to="/students/addstudent">
                    <button className="add-button">Nouveau</button>
                </Link>
            </div>
            <table className="students-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email Pro</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Archivé</th>
                    <th>RegistrationN°</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.emailPro}</td>
                            <td>{student.phoneNumber}</td>
                            <td>{student.address}</td>
                            <td>{student.archive ? 'Oui' : 'Non'}</td>
                            <td>{student.registrationNo}</td>
                            <td className="actions">
                                <button className="icon-button edit" onClick={() => handleEdit(student.id)}>
                                    <FaEdit/>
                                </button>
                                <button className="icon-button delete" onClick={() => handleDelete(student.id)}>
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={9} className="no-results">Aucun étudiant trouvé</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
