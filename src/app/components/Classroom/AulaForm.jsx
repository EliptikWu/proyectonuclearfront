"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import * as AulasService from "@services/aulasService"; 

import TextInput from "@components/common/inputs/TextInput"; 
import CustomButton from "@components/common/CustomButton";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  capacidad: Yup.number()
    .min(1, "Capacidad mínima: 1")
    .required("La capacidad es obligatoria"),
  sedeId: Yup.string().required("La sede es obligatoria"),
  tipo: Yup.string().required("El tipo es obligatorio"),
  estado: Yup.string().required("El estado es obligatorio"),
});

export default function AulaForm({ mode = "create", initialData = null }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre: initialData?.nombre || "",
      capacidad: initialData?.capacidad || "",
      sedeId: initialData?.sedeId || "",
      tipo: initialData?.tipo || "TEORICA",
      estado: initialData?.estado || "LIBRE",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (mode === "create") {
          await AulasService.createAula(values);
        } else {
          await AulasService.updateAula(initialData.id, values);
        }
        router.push("/aula/view");
      } catch (err) {
        console.error("❌ Error al guardar aula:", err);
        alert("Error al guardar el aula");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <TextInput
        label="Nombre"
        name="nombre"
        placeholder="Ej: Aula 101"
        {...formik.getFieldProps("nombre")}
        error={formik.touched.nombre && formik.errors.nombre}
      />
      <TextInput
        label="Capacidad"
        name="capacidad"
        type="number"
        placeholder="Ej: 35"
        {...formik.getFieldProps("capacidad")}
        error={formik.touched.capacidad && formik.errors.capacidad}
      />
      <TextInput
        label="Sede ID"
        name="sedeId"
        placeholder="Ej: 1"
        {...formik.getFieldProps("sedeId")}
        error={formik.touched.sedeId && formik.errors.sedeId}
      />

      <div>
        <label className="block mb-1 font-medium">Tipo</label>
        <select
          name="tipo"
          className="w-full p-2 border rounded"
          {...formik.getFieldProps("tipo")}
        >
          <option value="TEORICA">Teórica</option>
          <option value="HIBRIDA">Híbrida</option>
        </select>
        {formik.touched.tipo && formik.errors.tipo && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.tipo}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Estado</label>
        <select
          name="estado"
          className="w-full p-2 border rounded"
          {...formik.getFieldProps("estado")}
        >
          <option value="LIBRE">Libre</option>
          <option value="INHABILITADA">Inhabilitada</option>
        </select>
        {formik.touched.estado && formik.errors.estado && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.estado}</p>
        )}
      </div>

      <CustomButton type="submit">
        {mode === "create" ? "Crear Aula" : "Guardar Cambios"}
      </CustomButton>
    </form>
  );
}
