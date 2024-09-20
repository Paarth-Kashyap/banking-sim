 namespace BankingApp.api.Dtos;


// The DTO class will act as a way for the data to be transfered between backend programs 
//helps keep a structure of all entities and their relationships while keeping the data safe and secure
public record class BankDto(int Id, 
                            string Name, 
                            string Address, 
                            string PhoneNumber, 
                            string Email);
