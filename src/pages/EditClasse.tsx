import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditClasse.css';

interface Classe {
    id: number;
    name: string;
    description: string;
    archive: boolean;
}

const EditClasse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [classe, setClasse] = useState<Classe | null>(null);

    useEffect(() => {
        const fetchClasse = async () => {
            try {
                if (id) {
                    const response = await axios.get<Classe>(`http://localhost:8080/classes/${id}`);
                    setClasse(response.data);
                }
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la récupération des données de la classe.');
            }
        };

        fetchClasse();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (classe) {
            const { name, value } = e.target;
            setClasse(prevState => ({
                ...prevState!,
                [name]: name === 'archive' ? value === 'true' : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (classe) {
            try {
                await axios.put<Classe>(`http://localhost:8080/classes/${classe.id}`, classe);
                alert('Classe modifiée avec succès!');
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la modification de la classe.');
            }
        }
    };

    if (!classe) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container">
            <h1>Modifier une Classe</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom de la classe</label>
                    <input
                        type="text"
                        name="name"
                        value={classe.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={classe.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="archive">Archivée</label>
                    <select
                        name="archive"
                        value={classe.archive ? 'true' : 'false'}
                        onChange={handleChange}
                    >
                        <option value="false">Non</option>
                        <option value="true">Oui</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Modifier Classe</button>
            </form>
        </div>
    );
};

export default EditClasse;
