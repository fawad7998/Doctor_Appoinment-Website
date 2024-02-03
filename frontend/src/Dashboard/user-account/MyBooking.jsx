import useFetchData from "../../hooks/useFetchData";
import { BASEURL } from "../../config";
import Loading from "../../components/Loading/Loading";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Error from "../../components/Error/Error";

const MyBooking = () => {
  const {
    data: appointment,
    loading,
    error,
  } = useFetchData(`${BASEURL}/users/appointments/my-appointments`);
  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errorMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointment.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
      {!loading && !error && appointment.length === 0 && (
        <h2 className="mt-5 text-center  text-[20px] leading-7 font-semibold text-primaryColor">
          You did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBooking;
