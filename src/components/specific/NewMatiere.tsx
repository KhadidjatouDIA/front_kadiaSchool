import { createMatiere, updateMatiere } from "@/actions/soap.actions";
import { Classe, Matiere } from "@/interfaces/interfaces";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type NewMatiereProps = {
  record: any;
  onClose: () => void;
  onRefresh?: () => void;
};
function NewMatiere({ record, onClose, onRefresh }: NewMatiereProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Matiere>();


  const onSubmit: SubmitHandler<Classe> = async (data: any) => {
    if (record === null) {
      await createMatiere(data)
      .then(() => {
        toast.success(`Matière ajouté avec succès`);
        onClose();
        onRefresh?.();
      });
    } else {
        await updateMatiere(record.id, data)
        .then(() => {
                toast.success(`Matière mise à jour avec succès`);
                onClose();
                onRefresh?.();
            }
        );
    }
  };

  useEffect(() => {
    if (record && record !== null) {
      reset(record);
    }
  }, [record]);

  return (
    <div className="bg-transparent px-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full grid grid-cols-1 space-x-4">
          <div className="flex flex-col">
            <label className="label mb-2" htmlFor="example">
              Libellé
            </label>
            <input
              {...register("name", { required: true })}
              className={errors.name ? "input-error" : "input"}
            />
            {errors.name && (
              <span className="text-red-500">Ce champ est obligatoire</span>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center items-center space-x-4 mt-4">
          <button className="btn btn-ghost" type="reset">
            Réinitialiser
          </button>
          <button className="btn btn-primary" type="submit">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewMatiere;
