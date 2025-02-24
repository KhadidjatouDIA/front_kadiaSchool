import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import './Classes.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Classe {
    id?: number;
    name?: string;
    description?: string;
    archive?: boolean;
}

const Classes: React.FC = () => {
    const [classes, setClasses] = useState<Classe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Classe[]>('http://localhost:8080/classes'); // Changer l'URL pour les classes
            setClasses(response.data);
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
        navigate(`/classes/details/${id}`); // Changer la route pour l'édition des classes
    };

    const handleDelete = async (id: number) => {
        console.log(`Tentative de suppression de la classe avec l'ID: ${id}`);
        if (window.confirm('Voulez-vous vraiment supprimer cette classe ?')) {
            try {
                const response = await axios.delete(`http://localhost:8080/classes/${id}`);
                console.log('Response:', response); // Log the response to check for success
                setClasses(prevClasses => prevClasses.filter(classe => classe.id !== id));
                alert('Classe supprimée avec succès!');
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression: ' + (error.response ? error.response.data : error.message));
            }
        }
    };

    const filteredClasses = classes.filter(classe =>
        classe.name?.toLowerCase().includes(search.toLowerCase()) ||
        classe.description?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="container">
            <h1>Liste des Classes</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Rechercher une classe..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Link to="/classes/addclass"> {/* Changer la route pour ajouter une classe */}
                    <button className="add-button">Nouvelle Classe</button>
                </Link>
            </div>
            <table className="classes-table"> {/* Changer le nom de la classe si nécessaire */}
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
                {filteredClasses.length > 0 ? (
                    filteredClasses.map(classe => (
                        <tr key={classe.id}>
                            <td>{classe.id}</td>
                            <td>{classe.name}</td>
                            <td>{classe.description}</td>
                            <td>{classe.archive ? 'Oui' : 'Non'}</td>
                            <td className="actions">
                                <button className="icon-button edit" onClick={() => handleEdit(classe.id!)}>
                                    <FaEdit />
                                </button>
                                <button className="icon-button delete" onClick={() => handleDelete(classe.id!)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="no-results">Aucune classe trouvée</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Classes;
