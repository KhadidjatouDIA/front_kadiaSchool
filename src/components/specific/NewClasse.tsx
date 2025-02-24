import { CREATE_CLASSE, UPDATE_CLASSE } from "@/actions/graphql";
import { Classe } from "@/interfaces/interfaces";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type NewClasseProps = {
  record: any;
  onClose: () => void;
  onRefresh?: () => void;
};
function NewClasse({ record, onClose, onRefresh }: NewClasseProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Classe>();

  const [createUser] = useMutation(CREATE_CLASSE);
  const [updateUser] = useMutation(UPDATE_CLASSE);
  
  const onSubmit: SubmitHandler<Classe> = async (data: any) => {
    if (record === null) {
      await createUser({
        variables : {
            name: data?.name
        }
      })
      .then((res: any) => {
        toast.success(`Classe ${res?.data?.createClasse?.name} ajouté avec succès`);
        onClose();
        onRefresh?.();
      });
    } else {
        await updateUser({
            variables : {
                id: record?.id,
                name: data?.name
            }
        })
        .then((res: any) => {
          toast.success(`Classe ${res?.data?.createClasse?.name}  mise à jour avec succès`);
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

export default NewClasse;
