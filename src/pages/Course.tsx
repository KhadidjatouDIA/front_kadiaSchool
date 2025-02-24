import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import './Courses.css'; // Assurez-vous de créer un fichier CSS pour les cours
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Course {
    id?: number;
    name?: string;
    description?: string;
    archive?: boolean;
}

const Course: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Course[]>('http://localhost:8080/courses'); // Changer l'URL pour les cours
            setCourses(response.data);
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
        navigate(`/courses/details/${id}`); // Changer la route pour l'édition des cours
    };

    const handleDelete = async (id: number) => {
        console.log(`Tentative de suppression du cours avec l'ID: ${id}`);
        if (window.confirm('Voulez-vous vraiment supprimer ce cours ?')) {
            try {
                const response = await axios.delete(`http://localhost:8080/courses/${id}`);
                console.log('Response:', response); // Log the response to check for success
                setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
                alert('Cours supprimé avec succès!');
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression: ' + (error.response ? error.response.data : error.message));
            }
        }
    };

    const filteredCourses = courses.filter(course =>
        course.name?.toLowerCase().includes(search.toLowerCase()) ||
        course.description?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="container">
            <h1>Liste des Cours</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Rechercher un cours..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Link to="/courses/addcourse"> {/* Changer la route pour ajouter un cours */}
                    <button className="add-button">Nouveau Cours</button>
                </Link>
            </div>
            <table className="courses-table"> {/* Changer le nom de la classe si nécessaire */}
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Archivé</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.archive ? 'Oui' : 'Non'}</td>
                            <td className="actions">
                                <button className="icon-button edit" onClick={() => handleEdit(course.id!)}>
                                    <FaEdit />
                                </button>
                                <button className="icon-button delete" onClick={() => handleDelete(course.id!)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="no-results">Aucun cours trouvé</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Course;
