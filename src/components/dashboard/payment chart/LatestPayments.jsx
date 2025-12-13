const LatestPayments = ({ latestPayments }) => {
  //console.log(latestPayments);
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            <th colSpan={2} className="p-0"></th>
          </tr>
        </thead>

        <tbody>
          {latestPayments.map((latest, i) => (
            <tr key={i} className="group cursor-pointer">
              <td className="p-0" colSpan={2}>
                <div
                  className="flex items-center justify-between bg-white my-1 p-2
                rounded-xl shadow-sm group-hover:shadow-md transition
                group-hover:-translate-y-0.5"
                >
                  <div>
                    <p className="font-semibold text-secondary text-sm">
                      {latest?.paymentName}
                    </p>
                    <p className="text-xs text-secondary">
                      {latest?.paymentType} Payment
                    </p>
                    <p className="text-xs text-secondary">
                      {new Date(latest?.paidAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-gray-500 text-sm">
                    $ {latest?.amount}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestPayments;
