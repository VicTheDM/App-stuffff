-- 100 : Verificar si existe la placa en en algun complemento de narrativa
  SELECT
    V.folio AS 'folio',
    V.placas AS 'placa',
    V.rol_vehiculo AS 'rol',
    concat(V.marca, " ", V.modelo, " ", V.color, " No. Serie: ", V.numero_serie) AS 'vehiculo',
    EH.estatus AS 'estatus'
  FROM
    Vehiculos AS V
    LEFT JOIN
      EventosHistorico EH ON EH.folio = V.folio
  WHERE
    V.status = 1
    AND
      V.placas = ?
  ORDER BY
    V.id DESC;


--Este es el bueno
  select v.folio, v.placas, v.rol_vehiculo, 
  concat(v.marca, ' ', v.modelo, ' ', v.color, ' No. Serie: ', v.numero_serie) as vehiculo, eh.estatus  
  from "Vehiculos" v left join "EventosHistorial" eh on eh."Folio" = v.folio 
  where v.status = 1
  and v.placas = 'ELP3726'
  order by v."Id" desc

  --Este es el bueno
  select eh."Id", eh.fecha_de_creacion, eh.estatus , eh.incidencia, eh."Folio"  
  from "EventosHistorial" eh 
  left join "Eventos" e on e."Id" = eh."Folio" 
  where eh.status = 1 and e.status = 1
  and eh.telefono = '6143974064' order by e."Id" desc
-- 400 : Escuchador de estatus del evento
  SELECT
    EH.estatus AS 'estatus',
    EH.motivo_cancelacion AS 'motivo'
  FROM
    EventosHistorico AS EH
  WHERE
    EH.status = 1
    AND
      EH.folio = ?
  ORDER BY
    EH.id DESC
  LIMIT 1;

  SELECT 
  eh.estatus,
  eh.motivo_cancelacion --Pendiente de crear esta columna en la base de datos
  FROM "EventosHistorial" eh 
  WHERE eh.status = 1 AND eh."Folio" = ?
  ORDER BY eh."Id" DESC LIMIT 1
-- 500 : Eventos cercanos en base a al dirección y/o código postal para la relación de eventos
  SELECT
    E.folio AS 'Folio',
    E.Incidencia AS 'Incidencia',
    E.Direccion AS 'Direccion',
    EH.latitud AS 'Latitud',
    EH.longitud AS 'Longitud',
    1 AS 'Unidades asignadas', -- PENDIENTE CALCULAR UNIDADES ASIGNADAS
    (SELECT
      COUNT(*)
    FROM
      __EventosRelaciones _ER
    WHERE
      status _ER = 1 AND FOLIO = ?) AS 'Eventos relacionados', -- PENDIENTE CREAR TABLA DE RELACIONES
    E.status AS 'Estatus'
  FROM
    EventosHistorico AS EH
    LEFT JOIN Eventos AS E ON E.id = EH.folio
  WHERE
    E.status = 1
    AND E.fecha_creacion > DATE_SUB(NOW(), INTERVAL 24 HOUR) 
    AND (E.codigo_postal = ? OR E.direccion = ?)
  ORDER BY
    E.id DESC:


    --Este es el bueno
    select 
    eh."Folio" ,
    eh.incidencia ,
    eh.direccion ,
    eh.latitud ,
    eh.longitud 
    from "EventosHistorial" eh 
    left join "Eventos" e on e."Id" = eh."Folio" 
    where eh.status = 1
    and eh.fecha_de_creacion > (now() - interval '24' hour)
    and (eh.codigo_postal = '?' or eh.direccion = '?')
    order by eh."Id" desc

-- 600 : Lista de folios relacionados
SELECT
  ea.Folio,
FROM
  EventosAsociados ea
WHERE
  ea.status = 1
  AND ea.folio_hijo = ?

--Este es el bueno
select ea.folio, eh.incidencia 
from "EventosAsociados" ea 
left join "EventosHistorial" eh on eh."Folio" = ea.folio 
where ea.status = 1 and eh.status = 1
and ea.folio_hijo = 0
-- 700 : Relación de eventos
  -- Inserci


--Eventos activos
select * from "EventosHistorial" eh2
inner join (
select eh."Folio", max(eh."Id") id 
from "EventosHistorial" eh 
where eh.status = 1 
group by 
eh."Folio") t1 on eh2."Id" = t1."id"
where eh2.estatus not in ('Concluida', 'Cancelado')
order by eh2."Folio" desc