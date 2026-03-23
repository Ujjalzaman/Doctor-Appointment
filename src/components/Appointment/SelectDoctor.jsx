import { useState, useMemo, useRef } from 'react';
import { Card, Empty, Skeleton, Input, Select, Button, Pagination } from 'antd';
import { FaUserMd, FaBriefcaseMedical, FaHospital, FaGraduationCap } from 'react-icons/fa';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { doctorSpecialistOptions } from '../../constant/global';
import './AppointmentFlow.css';

const PAGE_SIZE = 12;

const SelectDoctor = ({ selectedDoctor, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState(undefined);
  const [page, setPage] = useState(1);
  const searchTimeoutRef = useRef(null);

  const queryParams = useMemo(
    () => ({
      limit: PAGE_SIZE,
      page,
      ...(debouncedSearch?.trim() && { searchTerm: debouncedSearch.trim() }),
      ...(specialtyFilter && { specialist: specialtyFilter }),
    }),
    [page, debouncedSearch, specialtyFilter]
  );

  const { data, isLoading, isError } = useGetDoctorsQuery(queryParams);
  const doctors = data?.doctors || [];
  const meta = data?.meta || {};
  const total = meta?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 350);
  };

  const handleSpecialtyChange = (value) => {
    setSpecialtyFilter(value ?? undefined);
    setPage(1);
  };

  const handlePageChange = (p) => {
    setPage(p);
  };

  return (
    <div className="appointment-step appointment-step--select-doctor">
      <p className="appointment-step__title">Choose your doctor</p>
      <p className="appointment-step__subtitle">
        Search or filter by your concern so we can show the right specialists. Select a doctor to continue.
      </p>

      <div className="select-doctor-toolbar">
        <Input.Search
          placeholder="Search by name, specialization, or degree..."
          allowClear
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={(v) => {
            setDebouncedSearch(v || '');
            setPage(1);
          }}
          className="select-doctor-search"
          size="large"
        />
        <Select
          placeholder="What's your concern? Filter by specialty"
          options={[{ label: 'All specialties', value: null }, ...doctorSpecialistOptions]}
          value={specialtyFilter ?? null}
          onChange={handleSpecialtyChange}
          allowClear
          className="select-doctor-filter"
          size="large"
          style={{ minWidth: 260 }}
        />
      </div>

      {isLoading ? (
        <div className="select-doctor-list">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="select-doctor-card select-doctor-card--rich select-doctor-card--skeleton">
              <div className="select-doctor-card__inner">
                <Skeleton.Image active className="select-doctor-card__avatar-wrap" />
                <div className="select-doctor-card__body">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Empty description="Unable to load doctors. Please try again later." className="select-doctor-empty" />
      ) : !doctors.length ? (
        <Empty
          description={debouncedSearch || specialtyFilter ? 'No doctors match your search or filter.' : 'No doctors available.'}
          className="select-doctor-empty"
        />
      ) : (
        <>
          <div className="select-doctor-list select-doctor-list--rich">
            {doctors.map((doc) => {
              const fullName = `${doc?.firstName || ''} ${doc?.lastName || ''}`.trim() || 'Doctor';
              const isSelected = selectedDoctor?.id === doc.id;
              return (
                <Card
                  key={doc.id}
                  className={`select-doctor-card select-doctor-card--rich ${isSelected ? 'select-doctor-card--selected' : ''}`}
                  hoverable
                  onClick={() => onSelect(doc)}
                >
                  <div className="select-doctor-card__inner">
                    <div className="select-doctor-card__avatar-wrap">
                      {doc?.img ? (
                        <img src={doc.img} alt={fullName} className="select-doctor-card__img" />
                      ) : (
                        <div className="select-doctor-card__placeholder">
                          <FaUserMd />
                        </div>
                      )}
                    </div>
                    <div className="select-doctor-card__body">
                      <h3 className="select-doctor-card__name">Dr. {fullName}</h3>
                      {doc?.designation && (
                        <p className="select-doctor-card__meta">
                          <FaGraduationCap className="select-doctor-card__meta-icon" />
                          {doc.designation}
                        </p>
                      )}
                      {doc?.specialization && (
                        <p className="select-doctor-card__meta select-doctor-card__meta--specialty">
                          <FaBriefcaseMedical className="select-doctor-card__meta-icon" />
                          {doc.specialization}
                        </p>
                      )}
                      {doc?.experience && (
                        <p className="select-doctor-card__meta">
                          <span className="select-doctor-card__meta-icon">Exp.</span>
                          {doc.experience}
                        </p>
                      )}
                      {(doc?.experienceHospitalName || doc?.clinicName) && (
                        <p className="select-doctor-card__meta">
                          <FaHospital className="select-doctor-card__meta-icon" />
                          {doc.experienceHospitalName || doc.clinicName}
                        </p>
                      )}
                      {doc?.city && (
                        <p className="select-doctor-card__meta select-doctor-card__meta--muted">
                          {doc.city}
                        </p>
                      )}
                      <Button
                        type={isSelected ? 'primary' : 'default'}
                        size="small"
                        className="select-doctor-card__btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(doc);
                        }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="select-doctor-pagination">
              <Pagination
                current={page}
                total={total}
                pageSize={PAGE_SIZE}
                showSizeChanger={false}
                onChange={handlePageChange}
                showTotal={(t) => `Total ${t} doctor${t !== 1 ? 's' : ''}`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectDoctor;
