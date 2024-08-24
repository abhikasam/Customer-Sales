namespace CustomerApplication.Models.Customer_Data
{
    public partial class Customer
    {
        public string _id { get; set; }
		public string Id { get; set; }
		
		public string Type { get; set; }

		public string CustomerId { get; set; }
		public string Title { get; set; }
		public string FirstName { get; set; }
        public string LastName { get; set; }
		public string EmailAddress { get; set; }
		public string PhoneNumber { get; set; }
		public DateTime CreationDate { get; set; }
		public List<Address> Addresses { get; set; }
		public int SalesOrderCount { get; set; }
    }
}

